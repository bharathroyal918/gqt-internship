import { NextRequest, NextResponse } from "next/server";
import { extractAuthUser } from "./authMiddleware";
import { ApiResponse } from "../utils/apiResponse";
import { HTTP_STATUS, ROLES } from "../config/constants";
import { JwtUserPayload } from "../utils/jwt";

export function requireRole(allowedRoles: string[]) {
  return (req: NextRequest): { user: JwtUserPayload } | NextResponse => {
    const user = extractAuthUser(req);
    if (!user) {
      return ApiResponse.error(
        "Authentication required to access this resource",
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    // Super admin bypasses all role checks
    if (user.role === ROLES.SUPER_ADMIN) {
      return { user };
    }

    if (!allowedRoles.includes(user.role)) {
      return ApiResponse.error(
        `Access denied. Requires one of roles: ${allowedRoles.join(", ")}`,
        HTTP_STATUS.FORBIDDEN
      );
    }

    return { user };
  };
}

export function requirePermission(requiredPermission: string) {
  return (req: NextRequest): { user: JwtUserPayload } | NextResponse => {
    const user = extractAuthUser(req);
    if (!user) {
      return ApiResponse.error(
        "Authentication required to access this resource",
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    if (user.role === ROLES.SUPER_ADMIN) {
      return { user };
    }

    const hasPerm = user.permissions && user.permissions.includes(requiredPermission);
    if (!hasPerm) {
      return ApiResponse.error(
        `Access denied. Requires permission: ${requiredPermission}`,
        HTTP_STATUS.FORBIDDEN
      );
    }

    return { user };
  };
}
