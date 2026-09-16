import { NextRequest } from "next/server";
import { DashboardService } from "./dashboard.service";
import { ApiResponse } from "@/src/shared/utils/apiResponse";
import { handleApiError } from "@/src/shared/middlewares/errorHandler";
import { requireRole } from "@/src/shared/middlewares/rbacMiddleware";
import { ROLES } from "@/src/shared/config/constants";
import { extractAuthUser } from "@/src/shared/middlewares/authMiddleware";

export class DashboardController {
  static async getStudentDashboard(req: NextRequest) {
    try {
      const user = extractAuthUser(req);
      const data = await DashboardService.getStudentDashboard(user?.userId || "demo-student");
      return ApiResponse.success(data, "Student dashboard analytics retrieved");
    } catch (error) {
      return handleApiError(error, "DashboardController.getStudentDashboard");
    }
  }

  static async getAdminDashboard(req: NextRequest) {
    try {
      const auth = requireRole([
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.OPERATIONS,
        ROLES.PLACEMENT_TEAM,
        ROLES.HR,
      ])(req);
      if ("status" in auth) return auth;

      const data = await DashboardService.getAdminDashboard();
      return ApiResponse.success(data, "Admin executive analytics retrieved");
    } catch (error) {
      return handleApiError(error, "DashboardController.getAdminDashboard");
    }
  }
}
