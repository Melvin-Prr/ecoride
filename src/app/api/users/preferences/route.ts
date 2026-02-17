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
    const user = await requireAuth(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const preferences = await prisma.preference.findUnique({
      where: { userId: user.userId },
    });

    return successResponse(preferences || null);
  } catch (error) {
    console.error("Get preferences error:", error);
    return errorResponse("Erreur lors de la récupération des préférences", 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    if (!user) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const { smokingAllowed, petsAllowed, musicAllowed, talkingAllowed } = body;

    const preferences = await prisma.preference.upsert({
      where: { userId: user.userId },
      update: {
        smokingAllowed: smokingAllowed ?? false,
        petsAllowed: petsAllowed ?? false,
        musicAllowed: musicAllowed ?? true,
        talkingAllowed: talkingAllowed ?? true,
      },
      create: {
        userId: user.userId,
        smokingAllowed: smokingAllowed ?? false,
        petsAllowed: petsAllowed ?? false,
        musicAllowed: musicAllowed ?? true,
        talkingAllowed: talkingAllowed ?? true,
      },
    });

    return successResponse(preferences);
  } catch (error) {
    console.error("Update preferences error:", error);
    return errorResponse("Erreur lors de la mise à jour des préférences", 500);
  }
}
