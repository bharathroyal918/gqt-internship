import { NextRequest } from "next/server";
import { CertificatesService } from "./certificates.service";
import { ApiResponse } from "@/src/shared/utils/apiResponse";
import { handleApiError } from "@/src/shared/middlewares/errorHandler";
import { requireRole } from "@/src/shared/middlewares/rbacMiddleware";
import { ROLES, HTTP_STATUS } from "@/src/shared/config/constants";

export class CertificatesController {
  static async verify(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
    try {
      const { code } = await params;
      const result = await CertificatesService.verify(code);
      return ApiResponse.success(result, "Certificate successfully authenticated");
    } catch (error) {
      return handleApiError(error, "CertificatesController.verify");
    }
  }

  static async issue(req: NextRequest) {
    try {
      const auth = requireRole([
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.OPERATIONS,
        ROLES.CERTIFICATE_TEAM,
      ])(req);
      if ("status" in auth) return auth;

      const body = await req.json();
      const certificate = await CertificatesService.issue(body, auth.user.userId);
      return ApiResponse.success(certificate, "Certificate issued successfully", HTTP_STATUS.CREATED);
    } catch (error) {
      return handleApiError(error, "CertificatesController.issue");
    }
  }

  static async list(req: NextRequest) {
    try {
      const certs = await CertificatesService.list();
      return ApiResponse.success(certs, "Certificates retrieved successfully");
    } catch (error) {
      return handleApiError(error, "CertificatesController.list");
    }
  }
}
