import { NextRequest } from "next/server";
import { ContactService } from "./contact.service";
import { ApiResponse } from "@/src/shared/utils/apiResponse";
import { contactEnquirySchema } from "@/src/shared/validators";
import { handleApiError } from "@/src/shared/middlewares/errorHandler";
import { requireRole } from "@/src/shared/middlewares/rbacMiddleware";
import { ROLES, HTTP_STATUS } from "@/src/shared/config/constants";

export class ContactController {
  static async submit(req: NextRequest) {
    try {
      const body = await req.json();
      const validated = contactEnquirySchema.parse(body);
      const enquiry = await ContactService.submitEnquiry(validated);
      return ApiResponse.success(enquiry, "Enquiry submitted successfully", HTTP_STATUS.CREATED);
    } catch (error) {
      return handleApiError(error, "ContactController.submit");
    }
  }

  static async list(req: NextRequest) {
    try {
      const auth = requireRole([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.OPERATIONS])(req);
      if ("status" in auth) return auth;

      const enquiries = await ContactService.list();
      return ApiResponse.success(enquiries, "Enquiries retrieved");
    } catch (error) {
      return handleApiError(error, "ContactController.list");
    }
  }
}
