import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/middleware/auth";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  validationErrorResponse,
} from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const vehicles = await prisma.vehicle.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: "desc" },
    });

    return successResponse(vehicles);
  } catch (error) {
    console.error("Get vehicles error:", error);
    return errorResponse("Erreur lors de la récupération des véhicules", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const { brand, model, energyType, seats } = body;

    // Validation
    const errors: Record<string, string> = {};

    if (!brand) {
      errors.brand = "La marque est requise";
    }

    if (!model) {
      errors.model = "Le modèle est requis";
    }

    if (!energyType || !["ELECTRIC", "HYBRID", "GASOLINE", "DIESEL"].includes(energyType)) {
      errors.energyType = "Le type d'énergie est invalide";
    }

    if (!seats || seats < 1 || seats > 8) {
      errors.seats = "Le nombre de places doit être entre 1 et 8";
    }

    if (Object.keys(errors).length > 0) {
      return validationErrorResponse(errors);
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        brand,
        model,
        energyType,
        seats,
        userId: user.userId,
      },
    });

    return successResponse(vehicle, 201);
  } catch (error) {
    console.error("Create vehicle error:", error);
    return errorResponse("Erreur lors de l'ajout du véhicule", 500);
  }
}
