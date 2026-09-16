import { NextRequest } from "next/server";
import { SearchService } from "./search.service";
import { ApiResponse } from "@/src/shared/utils/apiResponse";
import { handleApiError } from "@/src/shared/middlewares/errorHandler";
import { extractAuthUser } from "@/src/shared/middlewares/authMiddleware";

export class SearchController {
  static async search(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const query = searchParams.get("q") || searchParams.get("search") || "";
      const user = extractAuthUser(req);
      const isAdmin = user ? ["SUPER_ADMIN", "ADMIN", "OPERATIONS"].includes(user.role) : false;

      const result = await SearchService.globalSearch(query, isAdmin);
      return ApiResponse.success(result, "Search query executed");
    } catch (error) {
      return handleApiError(error, "SearchController.search");
    }
  }
}
