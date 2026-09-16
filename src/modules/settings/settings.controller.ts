import { NextRequest } from "next/server";
import { SettingsService } from "./settings.service";
import { ApiResponse } from "@/src/shared/utils/apiResponse";
import { handleApiError } from "@/src/shared/middlewares/errorHandler";
import { requireRole } from "@/src/shared/middlewares/rbacMiddleware";
import { ROLES } from "@/src/shared/config/constants";

export class SettingsController {
  static async getSettings(req: NextRequest) {
    try {
      const auth = requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN])(req);
      if ("status" in auth) return auth;

      const settings = await SettingsService.getSettings();
      return ApiResponse.success(settings, "System settings retrieved");
    } catch (error) {
      return handleApiError(error, "SettingsController.getSettings");
    }
  }

  static async updateSettings(req: NextRequest) {
    try {
      const auth = requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN])(req);
      if ("status" in auth) return auth;

      const body = await req.json();
      const updated = await SettingsService.updateSettings(body, auth.user.userId);
      return ApiResponse.success(updated, "System settings updated successfully");
    } catch (error) {
      return handleApiError(error, "SettingsController.updateSettings");
    }
  }
}
