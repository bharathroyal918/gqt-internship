import { dataStore } from "@/src/shared/config/dataStore";

export class NotificationsService {
  static async list(userId?: string) {
    return dataStore.notifications;
  }

  static async markAsRead(id: string) {
    const notif = dataStore.notifications.find((n) => n.id === id);
    if (notif) {
      notif.read = true;
    }
    return { id, read: true };
  }

  static async markAllAsRead() {
    dataStore.notifications.forEach((n) => (n.read = true));
    return { success: true, message: "All notifications marked as read" };
  }

  static async broadcast(data: {
    audience: string;
    title: string;
    description: string;
    type: string;
    priority: string;
  }, userId?: string) {
    const newNotif = {
      id: `notif_${Date.now()}`,
      title: data.title,
      description: data.description,
      category: data.audience,
      date: "Just now",
      read: false,
      priority: data.priority,
      type: data.type,
    };

    dataStore.notifications.unshift(newNotif);

    dataStore.auditLogs.unshift({
      id: `aud_${Date.now()}`,
      entity: "Notification",
      entityId: newNotif.id,
      action: "BROADCAST",
      newValue: newNotif,
      userId,
      timestamp: new Date().toISOString(),
    });

    return newNotif;
  }
}
