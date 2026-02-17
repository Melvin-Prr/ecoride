import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/middleware/auth";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  notFoundResponse,
} from "@/lib/api-response";
import { sendBookingConfirmation } from "@/lib/email";
import { createLog, createNotification } from "@/lib/logging";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await requireAuth(request);
    if (!user) {
      return unauthorizedResponse("Vous devez être connecté pour réserver");
    }

    const body = await request.json();
    const { carpoolId, seats = 1 } = body;

    if (!carpoolId) {
      return errorResponse("L'ID du covoiturage est requis");
    }

    // Get carpool
    const carpool = await prisma.carpool.findUnique({
      where: { id: carpoolId },
    });

    if (!carpool) {
      return notFoundResponse("Covoiturage non trouvé");
    }

    // Check if user is the driver
    if (carpool.driverId === user.userId) {
      return errorResponse("Vous ne pouvez pas réserver votre propre covoiturage");
    }

    // Check if seats are available
    if (carpool.availableSeats < seats) {
      return errorResponse("Pas assez de places disponibles");
    }

    // Get user to check credits
    const passenger = await prisma.user.findUnique({
      where: { id: user.userId },
    });

    if (!passenger) {
      return unauthorizedResponse();
    }

    // Check if user has enough credits
    const totalCost = carpool.platformPrice * seats;
    if (passenger.credits < totalCost) {
      return errorResponse(
        `Crédits insuffisants. Il vous faut ${totalCost} crédits, vous en avez ${passenger.credits}.`
      );
    }

    // Check if user already has a booking for this carpool
    const existingBooking = await prisma.booking.findFirst({
      where: {
        carpoolId,
        passengerId: user.userId,
        status: {
          not: "CANCELLED",
        },
      },
    });

    if (existingBooking) {
      return errorResponse("Vous avez déjà une réservation pour ce covoiturage");
    }

    // Create booking and update user credits and carpool seats in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create booking
      const booking = await tx.booking.create({
        data: {
          carpoolId,
          passengerId: user.userId,
          seats,
          status: "CONFIRMED",
        },
        include: {
          carpool: {
            include: {
              driver: {
                select: {
                  pseudo: true,
                  email: true,
                },
              },
            },
          },
          passenger: {
            select: {
              pseudo: true,
              email: true,
            },
          },
        },
      });

      // Deduct credits from passenger
      await tx.user.update({
        where: { id: user.userId },
        data: {
          credits: {
            decrement: totalCost,
          },
        },
      });

      // Update available seats
      await tx.carpool.update({
        where: { id: carpoolId },
        data: {
          availableSeats: {
            decrement: seats,
          },
        },
      });

      return booking;
    });

    // Send booking confirmation email to passenger
    try {
      await sendBookingConfirmation({
        passengerName: result.passenger.pseudo,
        passengerEmail: result.passenger.email,
        driverName: result.carpool.driver.pseudo,
        departure: result.carpool.departure,
        destination: result.carpool.destination,
        departureDate: result.carpool.departureDate.toISOString(),
        departureTime: result.carpool.departureTime,
        seatsBooked: result.seats,
        totalPrice: totalCost,
        carpoolId: result.carpoolId,
      });
    } catch (emailError) {
      console.error("Failed to send booking confirmation email:", emailError);
      // Don't fail the booking if email fails
    }

    // Create notifications for driver and passenger
    createNotification({
      userId: result.carpool.driverId,
      type: "booking",
      title: "Nouvelle réservation",
      message: `${result.passenger.pseudo} a réservé ${result.seats} place(s) pour votre trajet ${result.carpool.departure} → ${result.carpool.destination}`,
      data: { bookingId: result.id, carpoolId: result.carpoolId },
    }).catch(console.error);

    createNotification({
      userId: user.userId,
      type: "booking",
      title: "Réservation confirmée",
      message: `Votre réservation pour ${result.carpool.departure} → ${result.carpool.destination} est confirmée`,
      data: { bookingId: result.id, carpoolId: result.carpoolId },
    }).catch(console.error);

    // Log booking creation
    createLog({
      timestamp: new Date(),
      action: "booking_created",
      userId: user.userId,
      details: {
        bookingId: result.id,
        carpoolId: result.carpoolId,
        seats: result.seats,
        totalCost,
      },
      statusCode: 201,
    }).catch(console.error);

    return successResponse(
      {
        booking: {
          id: result.id,
          carpoolId: result.carpoolId,
          seats: result.seats,
          status: result.status,
          createdAt: result.createdAt,
        },
        message: "Réservation confirmée !",
        creditsUsed: totalCost,
      },
      201
    );
  } catch (error) {
    console.error("Create booking error:", error);
    return errorResponse("Erreur lors de la réservation", 500);
  }
}
