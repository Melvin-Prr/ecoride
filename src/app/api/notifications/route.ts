import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";
import { apiSuccess } from "@/lib/api-response";
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "@/lib/logging";

export async function GET(req: NextRequest) {
  try {
    // Verify authentication
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return apiSuccess({ notifications: [] });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return apiSuccess({ notifications: [] });
    }

    const { searchParams } = new URL(req.url);
    const unreadOnly = searchParams.get("unreadOnly") === "true";
    const limit = parseInt(searchParams.get("limit") || "50");

    const notifications = await getNotifications(decoded.userId, {
      unreadOnly,
      limit,
    });

    return apiSuccess({ notifications });
  } catch (error) {
    console.error("Get notifications error:", error);
    return apiSuccess({ notifications: [] });
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Verify authentication
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return apiSuccess({ message: "Non authentifié" }, 401);
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return apiSuccess({ message: "Token invalide" }, 401);
    }

    const body = await req.json();
    const { notificationId, markAllRead } = body;

    if (markAllRead) {
      await markAllNotificationsAsRead(decoded.userId);
      return apiSuccess({ message: "Toutes les notifications ont été marquées comme lues" });
    }

    if (notificationId) {
      await markNotificationAsRead(notificationId);
      return apiSuccess({ message: "Notification marquée comme lue" });
    }

    return apiSuccess({ message: "Aucune action effectuée" }, 400);
  } catch (error) {
    console.error("Update notifications error:", error);
    return apiSuccess({ message: "Erreur lors de la mise à jour" }, 500);
  }
}
