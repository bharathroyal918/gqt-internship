import { NextRequest } from "next/server";
import { NotificationsController } from "@/src/modules/notifications/notifications.controller";

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return NotificationsController.markAsRead(req, context);
}
