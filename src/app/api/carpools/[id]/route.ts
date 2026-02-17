import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse, notFoundResponse } from "@/lib/api-response";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const carpool = await prisma.carpool.findUnique({
      where: { id },
      include: {
        driver: {
          select: {
            id: true,
            pseudo: true,
            reviewsReceived: {
              where: {
                status: "APPROVED",
              },
              select: {
                rating: true,
              },
            },
          },
        },
        vehicle: {
          select: {
            brand: true,
            model: true,
            energyType: true,
            seats: true,
          },
        },
      },
    });

    if (!carpool) {
      return notFoundResponse("Covoiturage non trouvé");
    }

    // Get driver preferences
    const preferences = await prisma.preference.findUnique({
      where: { userId: carpool.driverId },
    });

    // Get approved reviews for the driver
    const reviews = await prisma.review.findMany({
      where: {
        recipientId: carpool.driverId,
        status: "APPROVED",
      },
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        author: {
          select: {
            pseudo: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    // Calculate average rating
    const avgRating =
      carpool.driver.reviewsReceived.length > 0
        ? carpool.driver.reviewsReceived.reduce((sum, r) => sum + r.rating, 0) /
          carpool.driver.reviewsReceived.length
        : 0;

    // Count total trips by driver
    const totalTrips = await prisma.carpool.count({
      where: {
        driverId: carpool.driverId,
        status: "COMPLETED",
      },
    });

    return successResponse({
      id: carpool.id,
      departure: carpool.departure,
      destination: carpool.destination,
      departureDate: carpool.departureDate,
      departureTime: carpool.departureTime,
      arrivalTime: carpool.arrivalTime,
      availableSeats: carpool.availableSeats,
      pricePerSeat: carpool.pricePerSeat,
      platformPrice: carpool.platformPrice,
      status: carpool.status,
      driver: {
        pseudo: carpool.driver.pseudo,
        rating: avgRating > 0 ? Number(avgRating.toFixed(1)) : 0,
        totalTrips,
      },
      vehicle: carpool.vehicle,
      preferences: preferences || {
        smokingAllowed: false,
        petsAllowed: false,
        musicAllowed: true,
        talkingAllowed: true,
      },
      reviews: reviews.map((review) => ({
        id: review.id,
        author: review.author.pseudo,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
      })),
    });
  } catch (error) {
    console.error("Get carpool error:", error);
    return errorResponse("Erreur lors de la récupération du covoiturage", 500);
  }
}
