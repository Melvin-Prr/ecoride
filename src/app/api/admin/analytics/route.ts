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

    // Verify user is admin
    const admin = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!admin || admin.role !== "ADMIN") {
      return errorResponse("Accès refusé. Espace réservé aux administrateurs.", 403);
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

    // Table and column names follow the @@map / field names in schema.prisma
    const carpoolsByDay = await prisma.$queryRaw<
      Array<{ date: Date; count: bigint }>
    >`
      SELECT
        DATE("departureDate") as date,
        COUNT(*)::bigint as count
      FROM "carpools"
      WHERE "departureDate" >= ${thirtyDaysAgo}
      GROUP BY DATE("departureDate")
      ORDER BY date ASC
    `;

    // Credits earned by the platform per day: on each completed trip the
    // platform keeps (platformPrice - pricePerSeat) for every confirmed seat.
    const creditsPerDay = await prisma.$queryRaw<
      Array<{ date: Date; total: number }>
    >`
      SELECT
        DATE(c."departureDate") as date,
        SUM((c."platformPrice" - c."pricePerSeat") * b."seats")::integer as total
      FROM "carpools" c
      JOIN "bookings" b ON b."carpoolId" = c."id"
      WHERE c."status" = 'COMPLETED'
        AND b."status" = 'CONFIRMED'
        AND c."departureDate" >= ${thirtyDaysAgo}
      GROUP BY DATE(c."departureDate")
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

    return successResponse({
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
    return errorResponse("Erreur lors de la récupération des statistiques", 500);
  }
}
