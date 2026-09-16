import { NextRequest } from "next/server";
import { ApplicationsService } from "./applications.service";
import { ApiResponse } from "@/src/shared/utils/apiResponse";
import { parsePaginationParams } from "@/src/shared/utils/pagination";
import {
  applicationCreateSchema,
  applicationStatusUpdateSchema,
  interviewScheduleSchema,
} from "@/src/shared/validators";
import { handleApiError } from "@/src/shared/middlewares/errorHandler";
import { requireRole } from "@/src/shared/middlewares/rbacMiddleware";
import { ROLES, HTTP_STATUS } from "@/src/shared/config/constants";
import { extractAuthUser } from "@/src/shared/middlewares/authMiddleware";

export class ApplicationsController {
  static async apply(req: NextRequest) {
    try {
      const user = extractAuthUser(req);
      if (!user) {
        return ApiResponse.error("Authentication required to apply", HTTP_STATUS.UNAUTHORIZED);
      }

      const body = await req.json();
      const validated = applicationCreateSchema.parse(body);

      const application = await ApplicationsService.apply({
        studentId: user.userId,
        internshipId: validated.internshipId,
        coverLetter: validated.coverLetter,
        resumeSnapshotUrl: validated.resumeSnapshotUrl,
      });

      return ApiResponse.success(application, "Application submitted successfully", HTTP_STATUS.CREATED);
    } catch (error) {
      return handleApiError(error, "ApplicationsController.apply");
    }
  }

  static async list(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const pagination = parsePaginationParams(req, 10);
      const status = searchParams.get("status") || undefined;

      const result = await ApplicationsService.list({
        ...pagination,
        status,
      });

      return ApiResponse.success(
        result.items,
        "Applications retrieved successfully",
        HTTP_STATUS.OK,
        result.pagination
      );
    } catch (error) {
      return handleApiError(error, "ApplicationsController.list");
    }
  }

  static async getById(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params;
      const app = await ApplicationsService.getById(id);
      return ApiResponse.success(app, "Application details retrieved");
    } catch (error) {
      return handleApiError(error, "ApplicationsController.getById");
    }
  }

  static async updateStatus(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const auth = requireRole([
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.OPERATIONS,
        ROLES.HR,
        ROLES.COMPANY_HR,
      ])(req);
      if ("status" in auth) return auth;

      const { id } = await params;
      const body = await req.json();
      const validated = applicationStatusUpdateSchema.parse(body);

      const updated = await ApplicationsService.updateStatus(
        id,
        validated.status,
        validated.remarks,
        auth.user.userId
      );

      return ApiResponse.success(updated, "Application status updated successfully");
    } catch (error) {
      return handleApiError(error, "ApplicationsController.updateStatus");
    }
  }

  static async scheduleInterview(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const auth = requireRole([
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.OPERATIONS,
        ROLES.HR,
        ROLES.COMPANY_HR,
      ])(req);
      if ("status" in auth) return auth;

      const { id } = await params;
      const body = await req.json();
      const validated = interviewScheduleSchema.parse(body);

      const updated = await ApplicationsService.scheduleInterview(id, validated, auth.user.userId);
      return ApiResponse.success(updated, "Interview scheduled successfully");
    } catch (error) {
      return handleApiError(error, "ApplicationsController.scheduleInterview");
    }
  }
}
