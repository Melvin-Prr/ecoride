import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/middleware/auth";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
} from "@/lib/api-response";

export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const { role } = body;

    // Validate role
    if (!role || !["PASSENGER", "DRIVER"].includes(role)) {
      return errorResponse("Rôle invalide. Doit être PASSENGER ou DRIVER");
    }

    // Update user role
    const updatedUser = await prisma.user.update({
      where: { id: user.userId },
      data: { role },
      select: {
        id: true,
        email: true,
        pseudo: true,
        role: true,
        credits: true,
      },
    });

    return successResponse(updatedUser);
  } catch (error) {
    console.error("Update profile error:", error);
    return errorResponse("Erreur lors de la mise à jour du profil", 500);
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    if (!user) {
      return unauthorizedResponse();
    }

    // Get user bookings
    const bookings = await prisma.booking.findMany({
      where: { passengerId: user.userId },
      include: {
        carpool: {
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
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Get user carpools (as driver)
    const carpools = await prisma.carpool.findMany({
      where: { driverId: user.userId },
      include: {
        vehicle: {
          select: {
            brand: true,
            model: true,
          },
        },
        bookings: {
          include: {
            passenger: {
              select: {
                pseudo: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return successResponse({
      bookings,
      carpools,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return errorResponse("Erreur lors de la récupération du profil", 500);
  }
}
