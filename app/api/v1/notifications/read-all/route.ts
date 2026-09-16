import { NextRequest } from "next/server";
import { NotificationsController } from "@/src/modules/notifications/notifications.controller";

export async function PATCH(req: NextRequest) {
  return NotificationsController.markAllAsRead(req);
}
