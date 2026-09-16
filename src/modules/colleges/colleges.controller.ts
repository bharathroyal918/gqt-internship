import { NextRequest, NextResponse } from "next/server";
import { CollegesService } from "./colleges.service";
import { ApiResponse } from "@/src/shared/utils/apiResponse";
import { parsePaginationParams } from "@/src/shared/utils/pagination";
import { handleApiError } from "@/src/shared/middlewares/errorHandler";
import { requireRole } from "@/src/shared/middlewares/rbacMiddleware";
import { ROLES, HTTP_STATUS } from "@/src/shared/config/constants";

export class CollegesController {
  static async list(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const pagination = parsePaginationParams(req, 10);
      const district = searchParams.get("district") || undefined;

      const result = await CollegesService.list({
        ...pagination,
        district,
      });

      return ApiResponse.success(
        result.items,
        "Colleges retrieved successfully",
        HTTP_STATUS.OK,
        result.pagination
      );
    } catch (error) {
      return handleApiError(error, "CollegesController.list");
    }
  }

  static async getById(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params;
      const college = await CollegesService.getById(id);
      return ApiResponse.success(college, "College details retrieved");
    } catch (error) {
      return handleApiError(error, "CollegesController.getById");
    }
  }

  static async create(req: NextRequest) {
    try {
      const auth = requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.OPERATIONS])(req);
      if ("status" in auth) return auth;

      const body = await req.json();
      const created = await CollegesService.create(body, auth.user.userId);
      return ApiResponse.success(created, "College onboarded successfully", HTTP_STATUS.CREATED);
    } catch (error) {
      return handleApiError(error, "CollegesController.create");
    }
  }

  static async exportStudents(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const collegeId = searchParams.get("collegeId") || undefined;
      const csvData = await CollegesService.exportStudentsCsv(collegeId);

      return new NextResponse(csvData, {
        status: 200,
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="gqt_vtu_students_${Date.now()}.csv"`,
        },
      });
    } catch (error) {
      return handleApiError(error, "CollegesController.exportStudents");
    }
  }
}
