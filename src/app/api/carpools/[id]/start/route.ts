import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/api-response";
import { sendTripStartedNotification } from "@/lib/email";

export async function PUT(
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

    // Find carpool
    const carpool = await prisma.carpool.findUnique({
      where: { id: carpoolId },
      include: {
        driver: true,
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
      return apiError("Seul le conducteur peut démarrer ce trajet", 403);
    }

    // Verify status
    if (carpool.status !== "PENDING") {
      return apiError(
        `Ce trajet est déjà ${carpool.status === "IN_PROGRESS" ? "en cours" : "terminé"}`,
        400
      );
    }

    // Update carpool status
    const updatedCarpool = await prisma.carpool.update({
      where: { id: carpoolId },
      data: { status: "IN_PROGRESS" },
    });

    // Send email notifications to all passengers
    const emailPromises = carpool.bookings.map((booking) =>
      sendTripStartedNotification({
        passengerName: booking.passenger.pseudo,
        passengerEmail: booking.passenger.email,
        driverName: carpool.driver.pseudo,
        departure: carpool.departure,
        destination: carpool.destination,
        carpoolId: carpool.id,
      }).catch((error) => {
        console.error(
          `Failed to send trip started email to ${booking.passenger.email}:`,
          error
        );
      })
    );

    // Send all emails in parallel (don't wait for completion)
    Promise.all(emailPromises).catch((error) =>
      console.error("Some trip started emails failed:", error)
    );

    return apiSuccess({
      carpool: updatedCarpool,
      message: "Trajet démarré avec succès",
    });
  } catch (error) {
    console.error("Start carpool error:", error);
    return apiError("Erreur lors du démarrage du trajet", 500);
  }
}
