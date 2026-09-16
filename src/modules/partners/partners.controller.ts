import { NextRequest } from "next/server";
import { PartnersService } from "./partners.service";
import { ApiResponse } from "@/src/shared/utils/apiResponse";
import { handleApiError } from "@/src/shared/middlewares/errorHandler";
import { requireRole } from "@/src/shared/middlewares/rbacMiddleware";
import { ROLES } from "@/src/shared/config/constants";

export class PartnersController {
  static async list(req: NextRequest) {
    try {
      const partners = await PartnersService.list();
      return ApiResponse.success(partners, "Visible partners retrieved");
    } catch (error) {
      return handleApiError(error, "PartnersController.list");
    }
  }

  static async listAll(req: NextRequest) {
    try {
      const auth = requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.OPERATIONS])(req);
      if ("status" in auth) return auth;

      const partners = await PartnersService.listAll();
      return ApiResponse.success(partners, "All partner records retrieved");
    } catch (error) {
      return handleApiError(error, "PartnersController.listAll");
    }
  }

  static async updatePriority(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const auth = requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN])(req);
      if ("status" in auth) return auth;

      const { id } = await params;
      const body = await req.json();
      const updated = await PartnersService.updatePriority(id, body.priority);
      return ApiResponse.success(updated, "Partner priority updated");
    } catch (error) {
      return handleApiError(error, "PartnersController.updatePriority");
    }
  }

  static async toggleVisibility(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const auth = requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN])(req);
      if ("status" in auth) return auth;

      const { id } = await params;
      const updated = await PartnersService.toggleVisibility(id);
      return ApiResponse.success(updated, "Partner visibility updated");
    } catch (error) {
      return handleApiError(error, "PartnersController.toggleVisibility");
    }
  }
}
