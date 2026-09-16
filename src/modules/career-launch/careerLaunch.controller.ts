import { NextRequest } from "next/server";
import { CareerLaunchService } from "./careerLaunch.service";
import { ApiResponse } from "@/src/shared/utils/apiResponse";
import { handleApiError } from "@/src/shared/middlewares/errorHandler";
import { requireRole } from "@/src/shared/middlewares/rbacMiddleware";
import { ROLES, HTTP_STATUS } from "@/src/shared/config/constants";

export class CareerLaunchController {
  static async list(req: NextRequest) {
    try {
      const records = await CareerLaunchService.list();
      return ApiResponse.success(records, "Career Launch admissions retrieved");
    } catch (error) {
      return handleApiError(error, "CareerLaunchController.list");
    }
  }

  static async enroll(req: NextRequest) {
    try {
      const body = await req.json();
      const enrolled = await CareerLaunchService.enroll(body);
      return ApiResponse.success(enrolled, "Student enrolled successfully", HTTP_STATUS.CREATED);
    } catch (error) {
      return handleApiError(error, "CareerLaunchController.enroll");
    }
  }
}
