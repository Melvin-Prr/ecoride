import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/middleware/auth";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  validationErrorResponse,
} from "@/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await requireAuth(request);
    if (!user) {
      return unauthorizedResponse("Vous devez être connecté pour créer un covoiturage");
    }

    const body = await request.json();
    const {
      departure,
      destination,
      departureDate,
      departureTime,
      arrivalTime,
      availableSeats,
      pricePerSeat,
      vehicleId,
    } = body;

    // Validation
    const errors: Record<string, string> = {};

    if (!departure) {
      errors.departure = "Le lieu de départ est requis";
    }

    if (!destination) {
      errors.destination = "La destination est requise";
    }

    if (!departureDate) {
      errors.departureDate = "La date de départ est requise";
    }

    if (!departureTime) {
      errors.departureTime = "L'heure de départ est requise";
    }

    if (!arrivalTime) {
      errors.arrivalTime = "L'heure d'arrivée est requise";
    }

    if (!availableSeats || availableSeats < 1 || availableSeats > 8) {
      errors.availableSeats = "Le nombre de places doit être entre 1 et 8";
    }

    if (!pricePerSeat || pricePerSeat < 0) {
      errors.pricePerSeat = "Le prix par place est invalide";
    }

    if (!vehicleId) {
      errors.vehicleId = "Le véhicule est requis";
    }

    if (Object.keys(errors).length > 0) {
      return validationErrorResponse(errors);
    }

    // Check if vehicle belongs to user
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle || vehicle.userId !== user.userId) {
      return errorResponse("Véhicule non trouvé ou non autorisé", 403);
    }

    // Calculate platform price (driver price + 2 credits)
    const platformPrice = pricePerSeat + 2;

    // Create carpool
    const carpool = await prisma.carpool.create({
      data: {
        departure,
        destination,
        departureDate: new Date(departureDate),
        departureTime,
        arrivalTime,
        availableSeats,
        pricePerSeat,
        platformPrice,
        driverId: user.userId,
        vehicleId,
        status: "PENDING",
      },
      include: {
        driver: {
          select: {
            pseudo: true,
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
    });

    return successResponse(carpool, 201);
  } catch (error) {
    console.error("Create carpool error:", error);
    return errorResponse("Erreur lors de la création du covoiturage", 500);
  }
}
