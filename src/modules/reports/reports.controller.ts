import { NextRequest, NextResponse } from "next/server";
import { ReportsService } from "./reports.service";
import { ApiResponse } from "@/src/shared/utils/apiResponse";
import { handleApiError } from "@/src/shared/middlewares/errorHandler";
import { requireRole } from "@/src/shared/middlewares/rbacMiddleware";
import { ROLES } from "@/src/shared/config/constants";

export class ReportsController {
  static async exportReport(req: NextRequest) {
    try {
      const auth = requireRole([
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.OPERATIONS,
        ROLES.PLACEMENT_TEAM,
      ])(req);
      if ("status" in auth) return auth;

      const { searchParams } = new URL(req.url);
      const type = searchParams.get("type") || "applications";
      const format = (searchParams.get("format") || "csv") as "csv" | "json";

      let data: any;
      if (type === "colleges") {
        data = await ReportsService.exportColleges(format);
      } else if (type === "internships") {
        data = await ReportsService.exportInternships(format);
      } else {
        data = await ReportsService.exportApplications(format);
      }

      if (format === "csv") {
        return new NextResponse(data, {
          status: 200,
          headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": `attachment; filename="gqt_${type}_report_${Date.now()}.csv"`,
          },
        });
      }

      return ApiResponse.success(data, `Report for ${type} generated`);
    } catch (error) {
      return handleApiError(error, "ReportsController.exportReport");
    }
  }
}
