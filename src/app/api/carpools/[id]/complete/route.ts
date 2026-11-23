import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-response";
import { sendTripCompletedNotification } from "@/lib/email";
import { createLog, createNotification } from "@/lib/logging";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return errorResponse("Token manquant", 401);
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return errorResponse("Token invalide", 401);
    }

    const userId = decoded.userId;
    const carpoolId = (await params).id;

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
      return errorResponse("Covoiturage introuvable", 404);
    }

    // Verify user is the driver
    if (carpool.driverId !== userId) {
      return errorResponse("Seul le conducteur peut terminer ce trajet", 403);
    }

    // Verify status
    if (carpool.status !== "IN_PROGRESS") {
      return errorResponse(
        carpool.status === "PENDING"
          ? "Vous devez d'abord démarrer le trajet"
          : "Ce trajet est déjà terminé",
        400
      );
    }

    // Calculate total seats booked for completed trip
    const confirmedBookings = carpool.bookings;
    const totalSeatsBooked = confirmedBookings.reduce(
      (sum: number, booking: { seats: number }) => sum + booking.seats,
      0
    );

    // Driver earns the price they set per seat; the platform keeps the
    // difference with platformPrice (2 credits per seat).
    const creditsToAward = carpool.pricePerSeat * totalSeatsBooked;

    // Transaction: Mark trip as completed and credit driver
    const result = await prisma.$transaction(async (tx: any) => {
      // Update carpool status
      const updatedCarpool = await tx.carpool.update({
        where: { id: carpoolId },
        data: { status: "COMPLETED" },
      });

      // Credit the driver
      const updatedDriver = await tx.user.update({
        where: { id: userId },
        data: {
          credits: {
            increment: creditsToAward,
          },
        },
      });

      return { carpool: updatedCarpool, driver: updatedDriver, creditsToAward };
    });

    // Send trip completed emails with review request to all passengers
    const emailPromises = confirmedBookings.map((booking: any) =>
      sendTripCompletedNotification({
        passengerName: booking.passenger.pseudo,
        passengerEmail: booking.passenger.email,
        driverName: carpool.driver.pseudo,
        departure: carpool.departure,
        destination: carpool.destination,
        carpoolId: carpool.id,
      }).catch((error) => {
        console.error(
          `Failed to send trip completed email to ${booking.passenger.email}:`,
          error
        );
      })
    );

    // Send all emails in parallel (don't wait for completion)
    Promise.all(emailPromises).catch((error) =>
      console.error("Some trip completed emails failed:", error)
    );

    // Create notifications for all passengers and driver
    confirmedBookings.forEach((booking: any) => {
      createNotification({
        userId: booking.passengerId,
        type: "trip_complete",
        title: "Trajet terminé",
        message: `Le trajet ${carpool.departure} → ${carpool.destination} est terminé. Laissez un avis !`,
        data: { carpoolId: carpool.id, bookingId: booking.id },
      }).catch(console.error);
    });

    createNotification({
      userId: userId,
      type: "credits",
      title: "Crédits gagnés",
      message: `Vous avez gagne ${result.creditsToAward} credits pour votre trajet`,
      data: { carpoolId: carpool.id, credits: result.creditsToAward },
    }).catch(console.error);

    // Log trip completion
    createLog({
      timestamp: new Date(),
      action: "trip_completed",
      userId: userId,
      details: {
        carpoolId: carpool.id,
        creditsAwarded: result.creditsToAward,
        passengersCount: confirmedBookings.length,
      },
      statusCode: 200,
    }).catch(console.error);

    return successResponse({
      ...result,
      message: `Trajet terminé avec succès. Vous avez gagné ${result.creditsToAward} crédits.`,
    });
  } catch (error) {
    console.error("Complete carpool error:", error);
    return errorResponse("Erreur lors de la finalisation du trajet", 500);
  }
}
