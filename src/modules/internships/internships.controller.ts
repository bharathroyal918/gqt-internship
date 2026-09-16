import { NextRequest } from "next/server";
import { InternshipsService } from "./internships.service";
import { ApiResponse } from "@/src/shared/utils/apiResponse";
import { parsePaginationParams } from "@/src/shared/utils/pagination";
import { internshipCreateSchema, internshipUpdateSchema } from "@/src/shared/validators";
import { handleApiError } from "@/src/shared/middlewares/errorHandler";
import { requireRole } from "@/src/shared/middlewares/rbacMiddleware";
import { ROLES, HTTP_STATUS } from "@/src/shared/config/constants";
import { extractAuthUser } from "@/src/shared/middlewares/authMiddleware";

export class InternshipsController {
  static async list(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const pagination = parsePaginationParams(req, 12);

      const category = searchParams.get("category") || undefined;
      const mode = searchParams.get("mode") || undefined;
      const location = searchParams.get("location") || undefined;
      const minStipend = searchParams.get("minStipend") ? parseInt(searchParams.get("minStipend")!, 10) : undefined;
      const status = searchParams.get("status") || undefined;
      const featured = searchParams.get("featured") ? searchParams.get("featured") === "true" : undefined;

      const result = await InternshipsService.list({
        ...pagination,
        category,
        mode,
        location,
        minStipend,
        status,
        featured,
      });

      return ApiResponse.success(
        result.items,
        "Internships retrieved successfully",
        HTTP_STATUS.OK,
        result.pagination
      );
    } catch (error) {
      return handleApiError(error, "InternshipsController.list");
    }
  }

  static async getById(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params;
      const internship = await InternshipsService.getById(id);
      return ApiResponse.success(internship, "Internship details retrieved");
    } catch (error) {
      return handleApiError(error, "InternshipsController.getById");
    }
  }

  static async create(req: NextRequest) {
    try {
      const auth = requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.OPERATIONS, ROLES.COMPANY_HR])(req);
      if ("status" in auth) return auth; // Response if denied

      const body = await req.json();
      const validated = internshipCreateSchema.parse(body);
      const created = await InternshipsService.create(validated, auth.user.userId);

      return ApiResponse.success(created, "Internship created successfully", HTTP_STATUS.CREATED);
    } catch (error) {
      return handleApiError(error, "InternshipsController.create");
    }
  }

  static async update(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const auth = requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.OPERATIONS, ROLES.COMPANY_HR])(req);
      if ("status" in auth) return auth;

      const { id } = await params;
      const body = await req.json();
      const validated = internshipUpdateSchema.parse(body);
      const updated = await InternshipsService.update(id, validated, auth.user.userId);

      return ApiResponse.success(updated, "Internship updated successfully");
    } catch (error) {
      return handleApiError(error, "InternshipsController.update");
    }
  }

  static async delete(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const auth = requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN])(req);
      if ("status" in auth) return auth;

      const { id } = await params;
      const result = await InternshipsService.delete(id, auth.user.userId);
      return ApiResponse.success(result, "Internship deleted successfully");
    } catch (error) {
      return handleApiError(error, "InternshipsController.delete");
    }
  }

  static async getRelated(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params;
      const related = await InternshipsService.getRelated(id);
      return ApiResponse.success(related, "Related internships retrieved");
    } catch (error) {
      return handleApiError(error, "InternshipsController.getRelated");
    }
  }
}
