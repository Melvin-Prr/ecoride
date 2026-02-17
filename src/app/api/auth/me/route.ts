import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/middleware/auth";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = await requireAuth(request);
    if (!user) {
      return unauthorizedResponse();
    }

    // Get user with related data
    const userData = await prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        email: true,
        pseudo: true,
        role: true,
        credits: true,
        suspended: true,
        createdAt: true,
        updatedAt: true,
        vehicles: {
          select: {
            id: true,
            brand: true,
            model: true,
            energyType: true,
            seats: true,
          },
        },
        preferences: true,
      },
    });

    if (!userData) {
      return unauthorizedResponse();
    }

    return successResponse(userData);
  } catch (error) {
    console.error("Get current user error:", error);
    return errorResponse("Erreur lors de la récupération de l'utilisateur", 500);
  }
}
