import { NextRequest } from "next/server";
import { NotificationsController } from "@/src/modules/notifications/notifications.controller";

export async function POST(req: NextRequest) {
  return NotificationsController.broadcast(req);
}
