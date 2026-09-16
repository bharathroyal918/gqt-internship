import { NextRequest } from "next/server";
import { CSRService } from "./csr.service";
import { ApiResponse } from "@/src/shared/utils/apiResponse";
import { handleApiError } from "@/src/shared/middlewares/errorHandler";
import { requireRole } from "@/src/shared/middlewares/rbacMiddleware";
import { ROLES, HTTP_STATUS } from "@/src/shared/config/constants";

export class CSRController {
  static async list(req: NextRequest) {
    try {
      const drives = await CSRService.list();
      return ApiResponse.success(drives, "CSR Drives retrieved");
    } catch (error) {
      return handleApiError(error, "CSRController.list");
    }
  }

  static async create(req: NextRequest) {
    try {
      const auth = requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.OPERATIONS])(req);
      if ("status" in auth) return auth;

      const body = await req.json();
      const created = await CSRService.create(body);
      return ApiResponse.success(created, "CSR Drive created successfully", HTTP_STATUS.CREATED);
    } catch (error) {
      return handleApiError(error, "CSRController.create");
    }
  }
}
