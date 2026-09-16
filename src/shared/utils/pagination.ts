import { NextRequest } from "next/server";

export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export function parsePaginationParams(req: NextRequest, defaultLimit = 10): PaginationParams {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || `${defaultLimit}`, 10)));
  const search = searchParams.get("search") || searchParams.get("q") || undefined;
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = (searchParams.get("sortOrder")?.toLowerCase() === "asc" ? "asc" : "desc") as "asc" | "desc";

  return {
    page,
    limit,
    skip: (page - 1) * limit,
    search,
    sortBy,
    sortOrder,
  };
}
