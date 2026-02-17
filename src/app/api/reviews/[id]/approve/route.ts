import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/api-response";

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

    // Verify user is employee or admin
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || (user.role !== "EMPLOYEE" && user.role !== "ADMIN")) {
      return apiError("Accès refusé. Espace réservé aux employés.", 403);
    }

    const reviewId = params.id;

    // Check if review exists and is pending
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      return apiError("Avis introuvable", 404);
    }

    if (review.status !== "PENDING") {
      return apiError("Cet avis a déjà été traité", 400);
    }

    // Approve review
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: {
        status: "APPROVED",
        moderatedBy: decoded.userId,
        moderatedAt: new Date(),
      },
      include: {
        reviewer: {
          select: { pseudo: true, email: true },
        },
        reviewed: {
          select: { pseudo: true, email: true },
        },
      },
    });

    return apiSuccess({
      review: updatedReview,
      message: "Avis approuvé avec succès",
    });
  } catch (error) {
    console.error("Approve review error:", error);
    return apiError("Erreur lors de l'approbation de l'avis", 500);
  }
}
