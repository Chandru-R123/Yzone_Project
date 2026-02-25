import { Notification } from "../types/notification.types";

class NotificationService {

  static async send(notification: Notification) {
    switch (notification.type) {
      case "EMAIL":
        console.log("📧 Sending Email:", notification.message);
        break;

      case "WHATSAPP":
        console.log("💬 Sending WhatsApp:", notification.message);
        break;

      case "SYSTEM":
        console.log("🔔 System Notification:", notification.message);
        break;

      default:
        throw new Error("Unsupported notification type");
    }

    return { success: true };
  }
}

export default NotificationService;