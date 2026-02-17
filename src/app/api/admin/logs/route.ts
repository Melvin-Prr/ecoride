import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/api-response";
import prisma from "@/lib/prisma";
import { getLogs, getLogStatistics } from "@/lib/logging";

export async function GET(req: NextRequest) {
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
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || user.role !== "ADMIN") {
      return apiError("Accès refusé. Espace réservé aux administrateurs.", 403);
    }

    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");
    const userId = searchParams.get("userId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const limit = parseInt(searchParams.get("limit") || "100");
    const statsOnly = searchParams.get("statsOnly") === "true";

    if (statsOnly) {
      const stats = await getLogStatistics(
        startDate ? new Date(startDate) : undefined,
        endDate ? new Date(endDate) : undefined
      );
      return apiSuccess({ statistics: stats });
    }

    const logs = await getLogs({
      action: action || undefined,
      userId: userId || undefined,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      limit,
    });

    return apiSuccess({ logs, count: logs.length });
  } catch (error) {
    console.error("Get logs error:", error);
    return apiError("Erreur lors de la récupération des logs", 500);
  }
}
