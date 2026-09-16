import { NextRequest } from "next/server";
import { AuditService } from "./audit.service";
import { ApiResponse } from "@/src/shared/utils/apiResponse";
import { parsePaginationParams } from "@/src/shared/utils/pagination";
import { handleApiError } from "@/src/shared/middlewares/errorHandler";
import { requireRole } from "@/src/shared/middlewares/rbacMiddleware";
import { ROLES, HTTP_STATUS } from "@/src/shared/config/constants";

export class AuditController {
  static async list(req: NextRequest) {
    try {
      const auth = requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN])(req);
      if ("status" in auth) return auth;

      const { searchParams } = new URL(req.url);
      const pagination = parsePaginationParams(req, 10);
      const entity = searchParams.get("entity") || undefined;
      const action = searchParams.get("action") || undefined;

      const result = await AuditService.list({
        ...pagination,
        entity,
        action,
      });

      return ApiResponse.success(
        result.items,
        "Audit logs retrieved",
        HTTP_STATUS.OK,
        result.pagination
      );
    } catch (error) {
      return handleApiError(error, "AuditController.list");
    }
  }
}
