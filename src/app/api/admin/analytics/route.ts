import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/api-response";

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
    const admin = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!admin || admin.role !== "ADMIN") {
      return apiError("Accès refusé. Espace réservé aux administrateurs.", 403);
    }

    // Get platform statistics
    const [
      totalUsers,
      totalCarpools,
      totalBookings,
      totalCredits,
      completedTrips,
      activeTrips,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.carpool.count(),
      prisma.booking.count({ where: { status: "CONFIRMED" } }),
      prisma.user.aggregate({ _sum: { credits: true } }),
      prisma.carpool.count({ where: { status: "COMPLETED" } }),
      prisma.carpool.count({ where: { status: "IN_PROGRESS" } }),
    ]);

    // Get carpools per day for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const carpoolsByDay = await prisma.$queryRaw<
      Array<{ date: Date; count: bigint }>
    >`
      SELECT 
        DATE("departureDate") as date,
        COUNT(*)::bigint as count
      FROM "Carpool"
      WHERE "departureDate" >= ${thirtyDaysAgo}
      GROUP BY DATE("departureDate")
      ORDER BY date ASC
    `;

    // Get credits earned per day (completed trips)
    const creditsPerDay = await prisma.$queryRaw<
      Array<{ date: Date; total: number }>
    >`
      SELECT 
        DATE("departureDate") as date,
        SUM("pricePerSeat" * ("totalSeats" - "availableSeats"))::integer as total
      FROM "Carpool"
      WHERE "status" = 'COMPLETED' AND "departureDate" >= ${thirtyDaysAgo}
      GROUP BY DATE("departureDate")
      ORDER BY date ASC
    `;

    // Get recent users
    const recentUsers = await prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        pseudo: true,
        email: true,
        role: true,
        credits: true,
        suspended: true,
        createdAt: true,
      },
    });

    return apiSuccess({
      stats: {
        totalUsers,
        totalCarpools,
        totalBookings,
        totalCredits: totalCredits._sum.credits || 0,
        completedTrips,
        activeTrips,
      },
      charts: {
        carpoolsByDay: carpoolsByDay.map((row) => ({
          date: row.date,
          count: Number(row.count),
        })),
        creditsPerDay: creditsPerDay.map((row) => ({
          date: row.date,
          total: row.total || 0,
        })),
      },
      recentUsers,
    });
  } catch (error) {
    console.error("Get analytics error:", error);
    return apiError("Erreur lors de la récupération des statistiques", 500);
  }
}
