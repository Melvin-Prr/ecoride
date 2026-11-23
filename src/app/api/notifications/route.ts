import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";
import { successResponse } from "@/lib/api-response";
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "@/lib/logging";

export async function GET(req: NextRequest) {
  try {
    // Verify authentication
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return successResponse({ notifications: [] });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return successResponse({ notifications: [] });
    }

    const { searchParams } = new URL(req.url);
    const unreadOnly = searchParams.get("unreadOnly") === "true";
    const limit = parseInt(searchParams.get("limit") || "50");

    const notifications = await getNotifications(decoded.userId, {
      unreadOnly,
      limit,
    });

    return successResponse({ notifications });
  } catch (error) {
    console.error("Get notifications error:", error);
    return successResponse({ notifications: [] });
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Verify authentication
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return successResponse({ message: "Non authentifié" }, 401);
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return successResponse({ message: "Token invalide" }, 401);
    }

    const body = await req.json();
    const { notificationId, markAllRead } = body;

    if (markAllRead) {
      await markAllNotificationsAsRead(decoded.userId);
      return successResponse({ message: "Toutes les notifications ont été marquées comme lues" });
    }

    if (notificationId) {
      await markNotificationAsRead(notificationId);
      return successResponse({ message: "Notification marquée comme lue" });
    }

    return successResponse({ message: "Aucune action effectuée" }, 400);
  } catch (error) {
    console.error("Update notifications error:", error);
    return successResponse({ message: "Erreur lors de la mise à jour" }, 500);
  }
}
