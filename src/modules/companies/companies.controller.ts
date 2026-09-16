import { NextRequest } from "next/server";
import { CompaniesService } from "./companies.service";
import { ApiResponse } from "@/src/shared/utils/apiResponse";
import { parsePaginationParams } from "@/src/shared/utils/pagination";
import { companyCreateSchema } from "@/src/shared/validators";
import { handleApiError } from "@/src/shared/middlewares/errorHandler";
import { requireRole } from "@/src/shared/middlewares/rbacMiddleware";
import { ROLES, HTTP_STATUS } from "@/src/shared/config/constants";

export class CompaniesController {
  static async list(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const pagination = parsePaginationParams(req, 12);
      const tier = searchParams.get("tier") || undefined;
      const industry = searchParams.get("industry") || undefined;

      const result = await CompaniesService.list({
        ...pagination,
        tier,
        industry,
      });

      return ApiResponse.success(
        result.items,
        "Companies retrieved successfully",
        HTTP_STATUS.OK,
        result.pagination
      );
    } catch (error) {
      return handleApiError(error, "CompaniesController.list");
    }
  }

  static async getById(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params;
      const company = await CompaniesService.getById(id);
      return ApiResponse.success(company, "Company profile retrieved");
    } catch (error) {
      return handleApiError(error, "CompaniesController.getById");
    }
  }

  static async create(req: NextRequest) {
    try {
      const auth = requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.OPERATIONS])(req);
      if ("status" in auth) return auth;

      const body = await req.json();
      const validated = companyCreateSchema.parse(body);
      const created = await CompaniesService.create(validated, auth.user.userId);

      return ApiResponse.success(created, "Company added successfully", HTTP_STATUS.CREATED);
    } catch (error) {
      return handleApiError(error, "CompaniesController.create");
    }
  }
}
