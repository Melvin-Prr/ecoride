import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");

    // Build where clause
    const where: any = {
      status: "PENDING",
      availableSeats: {
        gt: 0,
      },
    };

    if (from) {
      where.departure = {
        contains: from,
        mode: "insensitive",
      };
    }

    if (to) {
      where.destination = {
        contains: to,
        mode: "insensitive",
      };
    }

    if (date) {
      // Search for carpools on the specified date
      const searchDate = new Date(date);
      const nextDay = new Date(searchDate);
      nextDay.setDate(nextDay.getDate() + 1);

      where.departureDate = {
        gte: searchDate,
        lt: nextDay,
      };
    }

    // Fetch carpools with related data
    const carpools = await prisma.carpool.findMany({
      where,
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
          },
        },
      },
      orderBy: {
        departureDate: "asc",
      },
    });

    // Calculate average rating for each driver
    const carpoolsWithRating = carpools.map((carpool) => {
      const reviews = carpool.driver.reviewsReceived;
      const avgRating =
        reviews.length > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0;

      return {
        id: carpool.id,
        departure: carpool.departure,
        destination: carpool.destination,
        departureDate: carpool.departureDate,
        departureTime: carpool.departureTime,
        arrivalTime: carpool.arrivalTime,
        availableSeats: carpool.availableSeats,
        platformPrice: carpool.platformPrice,
        driver: {
          pseudo: carpool.driver.pseudo,
          rating: avgRating > 0 ? Number(avgRating.toFixed(1)) : undefined,
        },
        vehicle: {
          energyType: carpool.vehicle.energyType,
        },
      };
    });

    // If no results and date provided, suggest alternative date
    if (carpoolsWithRating.length === 0 && date) {
      const alternativeDate = new Date(date);
      alternativeDate.setDate(alternativeDate.getDate() + 1);

      return successResponse({
        carpools: [],
        suggestion: {
          message: "Aucun covoiturage trouvé pour cette date",
          alternativeDate: alternativeDate.toISOString().split("T")[0],
        },
      });
    }

    return successResponse({
      carpools: carpoolsWithRating,
      count: carpoolsWithRating.length,
    });
  } catch (error) {
    console.error("Search error:", error);
    return errorResponse("Erreur lors de la recherche", 500);
  }
}
