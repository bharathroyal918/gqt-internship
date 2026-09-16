import { NextRequest } from "next/server";
import { JwtUtil, JwtUserPayload } from "../utils/jwt";
import { COOKIE_NAMES } from "../config/constants";

export interface AuthenticatedRequest extends NextRequest {
  user?: JwtUserPayload;
}

export function extractAuthUser(req: NextRequest): JwtUserPayload | null {
  // 1. Check Authorization Bearer header
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7).trim();
    const payload = JwtUtil.verifyAccessToken(token);
    if (payload) return payload;
  }

  // 2. Check HTTP-Only Cookie
  const cookieToken = req.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  if (cookieToken) {
    const payload = JwtUtil.verifyAccessToken(cookieToken);
    if (payload) return payload;
  }

  return null;
}
