import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";

export interface LogEntry {
  timestamp: Date;
  action: string;
  userId?: string;
  userEmail?: string;
  userRole?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  statusCode?: number;
  errorMessage?: string;
}

export interface Notification {
  userId: string;
  type: "booking" | "trip_start" | "trip_complete" | "trip_cancel" | "review" | "credits" | "admin";
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: Date;
}

/**
 * Log an action to MongoDB
 */
export async function createLog(log: LogEntry): Promise<void> {
  try {
    const client = await clientPromise;
    const db = client.db("ecoride");
    const logsCollection = db.collection("logs");

    await logsCollection.insertOne({
      ...log,
      timestamp: log.timestamp || new Date(),
    });
  } catch (error) {
    console.error("Failed to create log:", error);
    // Don't throw error to avoid breaking the main flow
  }
}

/**
 * Get logs with optional filters
 */
export async function getLogs(filters: {
  userId?: string;
  action?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}): Promise<LogEntry[]> {
  try {
    const client = await clientPromise;
    const db = client.db("ecoride");
    const logsCollection = db.collection<LogEntry>("logs");

    const query: any = {};
    
    if (filters.userId) {
      query.userId = filters.userId;
    }
    
    if (filters.action) {
      query.action = filters.action;
    }
    
    if (filters.startDate || filters.endDate) {
      query.timestamp = {};
      if (filters.startDate) {
        query.timestamp.$gte = filters.startDate;
      }
      if (filters.endDate) {
        query.timestamp.$lte = filters.endDate;
      }
    }

    const logs = await logsCollection
      .find(query)
      .sort({ timestamp: -1 })
      .limit(filters.limit || 100)
      .toArray();

    return logs as LogEntry[];
  } catch (error) {
    console.error("Failed to get logs:", error);
    return [];
  }
}

/**
 * Create a notification for a user
 */
export async function createNotification(notification: Omit<Notification, "read" | "createdAt">): Promise<void> {
  try {
    const client = await clientPromise;
    const db = client.db("ecoride");
    const notificationsCollection = db.collection("notifications");

    await notificationsCollection.insertOne({
      ...notification,
      read: false,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Failed to create notification:", error);
  }
}

/**
 * Get notifications for a user
 */
export async function getNotifications(
  userId: string,
  options?: { unreadOnly?: boolean; limit?: number }
): Promise<Notification[]> {
  try {
    const client = await clientPromise;
    const db = client.db("ecoride");
    const notificationsCollection = db.collection<Notification>("notifications");

    const query: any = { userId };
    
    if (options?.unreadOnly) {
      query.read = false;
    }

    const notifications = await notificationsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .limit(options?.limit || 50)
      .toArray();

    return notifications as Notification[];
  } catch (error) {
    console.error("Failed to get notifications:", error);
    return [];
  }
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(notificationId: string): Promise<void> {
  try {
    const client = await clientPromise;
    const db = client.db("ecoride");
    const notificationsCollection = db.collection("notifications");

    await notificationsCollection.updateOne(
      { _id: new ObjectId(notificationId) },
      { $set: { read: true } }
    );
  } catch (error) {
    console.error("Failed to mark notification as read:", error);
  }
}

/**
 * Mark all notifications as read for a user
 */
export async function markAllNotificationsAsRead(userId: string): Promise<void> {
  try {
    const client = await clientPromise;
    const db = client.db("ecoride");
    const notificationsCollection = db.collection("notifications");

    await notificationsCollection.updateMany(
      { userId, read: false },
      { $set: { read: true } }
    );
  } catch (error) {
    console.error("Failed to mark all notifications as read:", error);
  }
}

/**
 * Delete old logs (cleanup function)
 */
export async function deleteOldLogs(daysToKeep: number = 90): Promise<number> {
  try {
    const client = await clientPromise;
    const db = client.db("ecoride");
    const logsCollection = db.collection("logs");

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const result = await logsCollection.deleteMany({
      timestamp: { $lt: cutoffDate },
    });

    return result.deletedCount;
  } catch (error) {
    console.error("Failed to delete old logs:", error);
    return 0;
  }
}

/**
 * Get log statistics
 */
export async function getLogStatistics(startDate?: Date, endDate?: Date) {
  try {
    const client = await clientPromise;
    const db = client.db("ecoride");
    const logsCollection = db.collection("logs");

    const matchStage: any = {};
    
    if (startDate || endDate) {
      matchStage.timestamp = {};
      if (startDate) matchStage.timestamp.$gte = startDate;
      if (endDate) matchStage.timestamp.$lte = endDate;
    }

    const pipeline = [
      ...(Object.keys(matchStage).length > 0 ? [{ $match: matchStage }] : []),
      {
        $group: {
          _id: "$action",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ];

    const stats = await logsCollection.aggregate(pipeline).toArray();

    return stats;
  } catch (error) {
    console.error("Failed to get log statistics:", error);
    return [];
  }
}
