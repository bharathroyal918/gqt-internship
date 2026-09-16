import { NextRequest } from "next/server";
import { NotificationsService } from "./notifications.service";
import { ApiResponse } from "@/src/shared/utils/apiResponse";
import { notificationBroadcastSchema } from "@/src/shared/validators";
import { handleApiError } from "@/src/shared/middlewares/errorHandler";
import { requireRole } from "@/src/shared/middlewares/rbacMiddleware";
import { ROLES, HTTP_STATUS } from "@/src/shared/config/constants";
import { extractAuthUser } from "@/src/shared/middlewares/authMiddleware";

export class NotificationsController {
  static async list(req: NextRequest) {
    try {
      const user = extractAuthUser(req);
      const notifications = await NotificationsService.list(user?.userId);
      return ApiResponse.success(notifications, "Notifications retrieved");
    } catch (error) {
      return handleApiError(error, "NotificationsController.list");
    }
  }

  static async markAsRead(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params;
      const result = await NotificationsService.markAsRead(id);
      return ApiResponse.success(result, "Notification marked as read");
    } catch (error) {
      return handleApiError(error, "NotificationsController.markAsRead");
    }
  }

  static async markAllAsRead(req: NextRequest) {
    try {
      const result = await NotificationsService.markAllAsRead();
      return ApiResponse.success(result, "All notifications marked as read");
    } catch (error) {
      return handleApiError(error, "NotificationsController.markAllAsRead");
    }
  }

  static async broadcast(req: NextRequest) {
    try {
      const auth = requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.OPERATIONS])(req);
      if ("status" in auth) return auth;

      const body = await req.json();
      const validated = notificationBroadcastSchema.parse(body);
      const result = await NotificationsService.broadcast(validated, auth.user.userId);

      return ApiResponse.success(result, "Notification broadcast sent", HTTP_STATUS.CREATED);
    } catch (error) {
      return handleApiError(error, "NotificationsController.broadcast");
    }
  }
}
