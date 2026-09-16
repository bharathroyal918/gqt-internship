import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtUserPayload {
  userId: string;
  email: string;
  role: string;
  roleId: string;
  permissions?: string[];
  collegeId?: string;
  companyId?: string;
}

export class JwtUtil {
  static generateAccessToken(payload: JwtUserPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: "15m",
    });
  }

  static generateRefreshToken(payload: { userId: string }): string {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });
  }

  static verifyAccessToken(token: string): JwtUserPayload | null {
    try {
      return jwt.verify(token, env.JWT_SECRET) as JwtUserPayload;
    } catch {
      return null;
    }
  }

  static verifyRefreshToken(token: string): { userId: string } | null {
    try {
      return jwt.verify(token, env.JWT_REFRESH_SECRET) as { userId: string };
    } catch {
      return null;
    }
  }
}
