import { NextResponse } from "next/server";
import { HTTP_STATUS } from "../config/constants";

export interface ApiResponseEnvelope<T = any> {
  success: boolean;
  message: string;
  data: T | null;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
  errors?: any;
  timestamp: string;
  requestId: string;
}

export class ApiResponse {
  static success<T>(
    data: T,
    message: string = "Operation completed successfully",
    status: number = HTTP_STATUS.OK,
    pagination?: { page: number; limit: number; total: number; totalPages: number } | null,
    requestId?: string
  ): NextResponse<ApiResponseEnvelope<T>> {
    const payload: ApiResponseEnvelope<T> = {
      success: true,
      message,
      data,
      ...(pagination ? { pagination } : {}),
      errors: null,
      timestamp: new Date().toISOString(),
      requestId: requestId || `req_${Math.random().toString(36).substring(2, 11)}`,
    };
    return NextResponse.json(payload, { status });
  }

  static error(
    message: string = "An error occurred",
    status: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    errors?: any,
    requestId?: string
  ): NextResponse<ApiResponseEnvelope<null>> {
    const payload: ApiResponseEnvelope<null> = {
      success: false,
      message,
      data: null,
      errors: errors || null,
      timestamp: new Date().toISOString(),
      requestId: requestId || `req_${Math.random().toString(36).substring(2, 11)}`,
    };
    return NextResponse.json(payload, { status });
  }
}
