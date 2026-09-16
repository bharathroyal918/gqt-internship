import { NextRequest } from "next/server";
import { CircularsService } from "./circulars.service";
import { ApiResponse } from "@/src/shared/utils/apiResponse";
import { circularCreateSchema } from "@/src/shared/validators";
import { handleApiError } from "@/src/shared/middlewares/errorHandler";
import { requireRole } from "@/src/shared/middlewares/rbacMiddleware";
import { ROLES, HTTP_STATUS } from "@/src/shared/config/constants";

export class CircularsController {
  static async list(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const category = searchParams.get("category") || undefined;
      const search = searchParams.get("search") || undefined;

      const circulars = await CircularsService.list({ category, search });
      return ApiResponse.success(circulars, "Circulars retrieved successfully");
    } catch (error) {
      return handleApiError(error, "CircularsController.list");
    }
  }

  static async getById(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params;
      const circular = await CircularsService.getById(id);
      return ApiResponse.success(circular, "Circular retrieved");
    } catch (error) {
      return handleApiError(error, "CircularsController.getById");
    }
  }

  static async create(req: NextRequest) {
    try {
      const auth = requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.OPERATIONS])(req);
      if ("status" in auth) return auth;

      const body = await req.json();
      const validated = circularCreateSchema.parse(body);
      const created = await CircularsService.create(validated, auth.user.userId);

      return ApiResponse.success(created, "Circular published successfully", HTTP_STATUS.CREATED);
    } catch (error) {
      return handleApiError(error, "CircularsController.create");
    }
  }
}
