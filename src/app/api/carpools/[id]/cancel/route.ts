import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/api-response";
import { sendTripCancelledNotification } from "@/lib/email";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return apiError("Token manquant", 401);
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return apiError("Token invalide", 401);
    }

    const userId = decoded.userId;
    const carpoolId = params.id;

    // Find carpool with bookings
    const carpool = await prisma.carpool.findUnique({
      where: { id: carpoolId },
      include: {
        bookings: {
          where: { status: "CONFIRMED" },
          include: { passenger: true },
        },
      },
    });

    if (!carpool) {
      return apiError("Covoiturage introuvable", 404);
    }

    // Verify user is the driver
    if (carpool.driverId !== userId) {
      return apiError("Seul le conducteur peut annuler ce trajet", 403);
    }

    // Verify carpool hasn't started or completed
    if (carpool.status !== "PENDING") {
      return apiError(
        `Impossible d'annuler un trajet ${
          carpool.status === "IN_PROGRESS" ? "en cours" : "terminé"
        }`,
        400
      );
    }

    // Cancel all bookings and refund passengers
    const refunds = await prisma.$transaction(async (tx: any) => {
      const refundResults = [];

      for (const booking of carpool.bookings) {
        // Cancel booking
        await tx.booking.update({
          where: { id: booking.id },
          data: { status: "CANCELLED" },
        });

        // Refund passenger
        await tx.user.update({
          where: { id: booking.passengerId },
          data: {
            credits: {
              increment: booking.totalPrice,
            },
          },
        });

        refundResults.push({
          passengerId: booking.passengerId,
          passengerEmail: booking.passenger.email,
          refundedCredits: booking.totalPrice,
        });
      }

      // Mark carpool as cancelled
      await tx.carpool.update({
        where: { id: carpoolId },
        data: { status: "CANCELLED" },
      });

      return refundResults;
    });

    // Send cancellation emails to all passengers
    const emailPromises = refunds.map((refund) =>
      sendTripCancelledNotification({
        recipientName: carpool.bookings.find((b) => b.passengerId === refund.passengerId)
          ?.passenger.pseudo || "Passager",
        recipientEmail: refund.passengerEmail,
        departure: carpool.departure,
        destination: carpool.destination,
        departureDate: carpool.departureDate.toISOString(),
        departureTime: carpool.departureTime,
        refundAmount: refund.refundedCredits,
        reason: "Le conducteur a annulé le trajet",
      }).catch((error) => {
        console.error(
          `Failed to send cancellation email to ${refund.passengerEmail}:`,
          error
        );
      })
    );

    // Send all emails in parallel (don't wait for completion)
    Promise.all(emailPromises).catch((error) =>
      console.error("Some cancellation emails failed:", error)
    );

    return apiSuccess({
      message: "Trajet annulé avec succès. Les passagers ont été remboursés.",
      refunds,
    });
  } catch (error) {
    console.error("Cancel carpool error:", error);
    return apiError("Erreur lors de l'annulation du trajet", 500);
  }
}
