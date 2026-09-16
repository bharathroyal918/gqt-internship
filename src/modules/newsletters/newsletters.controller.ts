import { NextRequest } from "next/server";
import { NewslettersService } from "./newsletters.service";
import { ApiResponse } from "@/src/shared/utils/apiResponse";
import { newsletterSubscribeSchema } from "@/src/shared/validators";
import { handleApiError } from "@/src/shared/middlewares/errorHandler";
import { HTTP_STATUS } from "@/src/shared/config/constants";

export class NewslettersController {
  static async subscribe(req: NextRequest) {
    try {
      const body = await req.json();
      const validated = newsletterSubscribeSchema.parse(body);
      const result = await NewslettersService.subscribe(validated.email, validated.source);
      return ApiResponse.success(result, "Subscribed successfully", HTTP_STATUS.CREATED);
    } catch (error) {
      return handleApiError(error, "NewslettersController.subscribe");
    }
  }
}
