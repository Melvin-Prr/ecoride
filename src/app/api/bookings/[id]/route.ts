import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/middleware/auth";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  notFoundResponse,
} from "@/lib/api-response";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const user = await requireAuth(request);
    if (!user) {
      return unauthorizedResponse("Vous devez être connecté");
    }

    const { id } = await params;

    // Get booking
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        carpool: {
          include: {
            driver: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });

    if (!booking) {
      return notFoundResponse("Réservation non trouvée");
    }

    // Check if user is the passenger
    if (booking.passengerId !== user.userId) {
      return errorResponse("Vous ne pouvez annuler que vos propres réservations", 403);
    }

    // Check if booking is already cancelled
    if (booking.status === "CANCELLED") {
      return errorResponse("Cette réservation est déjà annulée");
    }

    // Calculate refund amount
    const refundAmount = booking.carpool.platformPrice * booking.seats;

    // Cancel booking and refund credits in a transaction
    await prisma.$transaction(async (tx) => {
      // Update booking status
      await tx.booking.update({
        where: { id },
        data: {
          status: "CANCELLED",
        },
      });

      // Refund credits to passenger
      await tx.user.update({
        where: { id: booking.passengerId },
        data: {
          credits: {
            increment: refundAmount,
          },
        },
      });

      // Restore available seats
      await tx.carpool.update({
        where: { id: booking.carpoolId },
        data: {
          availableSeats: {
            increment: booking.seats,
          },
        },
      });
    });

    // TODO: Send email notification to driver about cancellation

    return successResponse({
      message: "Réservation annulée avec succès",
      creditsRefunded: refundAmount,
    });
  } catch (error) {
    console.error("Cancel booking error:", error);
    return errorResponse("Erreur lors de l'annulation", 500);
  }
}
