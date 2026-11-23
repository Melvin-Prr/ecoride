import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-response";

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

    // Verify user is employee or admin
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || (user.role !== "EMPLOYEE" && user.role !== "ADMIN")) {
      return errorResponse("Accès refusé. Espace réservé aux employés.", 403);
    }

    const reviewId = (await params).id;

    // Check if review exists and is pending
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      return errorResponse("Avis introuvable", 404);
    }

    if (review.status !== "PENDING") {
      return errorResponse("Cet avis a déjà été traité", 400);
    }

    // Reject review
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: {
        status: "REJECTED",
      },
      include: {
        author: {
          select: { pseudo: true, email: true },
        },
        recipient: {
          select: { pseudo: true, email: true },
        },
      },
    });

    return successResponse({
      review: updatedReview,
      message: "Avis rejeté avec succès",
    });
  } catch (error) {
    console.error("Reject review error:", error);
    return errorResponse("Erreur lors du rejet de l'avis", 500);
  }
}
