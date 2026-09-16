import { NextRequest } from "next/server";
import { NotificationsController } from "@/src/modules/notifications/notifications.controller";

export async function GET(req: NextRequest) {
  return NotificationsController.list(req);
}
