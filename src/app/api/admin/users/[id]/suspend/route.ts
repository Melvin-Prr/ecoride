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

    // Verify user is admin
    const admin = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!admin || admin.role !== "ADMIN") {
      return apiError("Accès refusé. Espace réservé aux administrateurs.", 403);
    }

    const userId = params.id;
    const body = await req.json();
    const { suspended } = body;

    if (typeof suspended !== "boolean") {
      return apiError("Le paramètre 'suspended' doit être un booléen", 400);
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return apiError("Utilisateur introuvable", 404);
    }

    // Prevent admin from suspending themselves
    if (userId === decoded.userId) {
      return apiError("Vous ne pouvez pas suspendre votre propre compte", 400);
    }

    // Prevent suspending other admins
    if (user.role === "ADMIN") {
      return apiError("Vous ne pouvez pas suspendre un autre administrateur", 403);
    }

    // Update user suspension status
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { suspended },
      select: {
        id: true,
        pseudo: true,
        email: true,
        role: true,
        suspended: true,
      },
    });

    return apiSuccess({
      user: updatedUser,
      message: suspended
        ? "Utilisateur suspendu avec succès"
        : "Suspension levée avec succès",
    });
  } catch (error) {
    console.error("Suspend user error:", error);
    return apiError("Erreur lors de la modification du statut de l'utilisateur", 500);
  }
}
