import { ZodError } from "zod";
import { ApiResponse } from "../utils/apiResponse";
import { HTTP_STATUS } from "../config/constants";
import { logger } from "../utils/logger";

export function handleApiError(error: unknown, context: string = "API") {
  logger.error({ err: error, context }, `Error in ${context}`);

  // 1. Zod Validation Error
  if (error instanceof ZodError) {
    const issues = (error as any).issues || (error as any).errors || [];
    const formattedErrors = issues.map((e: any) => ({
      field: Array.isArray(e.path) ? e.path.join(".") : String(e.path || ""),
      message: e.message,
    }));
    return ApiResponse.error(
      "Validation failed for request parameters",
      HTTP_STATUS.BAD_REQUEST,
      formattedErrors
    );
  }

  // 2. Custom Error with status code
  if (error && typeof error === "object" && "statusCode" in error) {
    const err = error as { statusCode: number; message: string; errors?: any };
    return ApiResponse.error(err.message, err.statusCode, err.errors);
  }

  // 3. Prisma or Database Error (P2002 unique constraint, etc.)
  if (error && typeof error === "object" && "code" in error) {
    const err = error as { code: string; message: string; meta?: any };
    if (err.code === "P2002") {
      const target = err.meta?.target ? ` on fields: ${err.meta.target}` : "";
      return ApiResponse.error(`A record with this value already exists${target}`, HTTP_STATUS.CONFLICT);
    }
    if (err.code === "P2025") {
      return ApiResponse.error("The requested record was not found in the database", HTTP_STATUS.NOT_FOUND);
    }
  }

  // 4. Fallback Internal Server Error
  const message = error instanceof Error ? error.message : "An unexpected server error occurred";
  return ApiResponse.error(message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
}
