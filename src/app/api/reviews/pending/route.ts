import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
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

    // Get pending reviews
    const pendingReviews = await prisma.review.findMany({
      where: {
        status: "PENDING",
      },
      include: {
        author: {
          select: {
            id: true,
            pseudo: true,
            email: true,
          },
        },
        recipient: {
          select: {
            id: true,
            pseudo: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse({
      reviews: pendingReviews.map(({ author, recipient, ...review }) => ({
        ...review,
        reviewer: author,
        reviewed: recipient,
      })),
      count: pendingReviews.length,
    });
  } catch (error) {
    console.error("Get pending reviews error:", error);
    return errorResponse("Erreur lors de la récupération des avis", 500);
  }
}
