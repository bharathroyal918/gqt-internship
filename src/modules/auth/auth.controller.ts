import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "./auth.service";
import { ApiResponse } from "@/src/shared/utils/apiResponse";
import { HTTP_STATUS, COOKIE_NAMES } from "@/src/shared/config/constants";
import { loginSchema, registerSchema, sendOtpSchema, verifyOtpSchema } from "@/src/shared/validators";
import { handleApiError } from "@/src/shared/middlewares/errorHandler";
import { extractAuthUser } from "@/src/shared/middlewares/authMiddleware";

export class AuthController {
  static async login(req: NextRequest) {
    try {
      const body = await req.json();
      const validated = loginSchema.parse(body);
      const result = await AuthService.login(validated.email, validated.password);

      const response = ApiResponse.success(
        { user: result.user, token: result.accessToken },
        "Login successful",
        HTTP_STATUS.OK
      );

      // Set HTTP-only cookies
      response.cookies.set(COOKIE_NAMES.ACCESS_TOKEN, result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 15 * 60,
      });

      response.cookies.set(COOKIE_NAMES.REFRESH_TOKEN, result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });

      return response;
    } catch (error) {
      return handleApiError(error, "AuthController.login");
    }
  }

  static async register(req: NextRequest) {
    try {
      const body = await req.json();
      const validated = registerSchema.parse(body);
      const result = await AuthService.register(validated);

      const response = ApiResponse.success(
        { user: result.user, token: result.accessToken },
        "Registration successful",
        HTTP_STATUS.CREATED
      );

      response.cookies.set(COOKIE_NAMES.ACCESS_TOKEN, result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 15 * 60,
      });

      return response;
    } catch (error) {
      return handleApiError(error, "AuthController.register");
    }
  }

  static async sendOtp(req: NextRequest) {
    try {
      const body = await req.json();
      const validated = sendOtpSchema.parse(body);
      const result = await AuthService.sendOtp(validated.identifier, validated.type);
      return ApiResponse.success(result, "OTP generated and dispatched");
    } catch (error) {
      return handleApiError(error, "AuthController.sendOtp");
    }
  }

  static async verifyOtp(req: NextRequest) {
    try {
      const body = await req.json();
      const validated = verifyOtpSchema.parse(body);
      const result = await AuthService.verifyOtp(validated.identifier, validated.otp);

      const response = ApiResponse.success(
        { user: result.user, token: result.accessToken },
        "OTP verification successful"
      );

      response.cookies.set(COOKIE_NAMES.ACCESS_TOKEN, result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 15 * 60,
      });

      return response;
    } catch (error) {
      return handleApiError(error, "AuthController.verifyOtp");
    }
  }

  static async refreshToken(req: NextRequest) {
    try {
      const token =
        req.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value || (await req.json().catch(() => ({})))?.refreshToken;

      if (!token) {
        return ApiResponse.error("Refresh token missing", HTTP_STATUS.UNAUTHORIZED);
      }

      const result = await AuthService.refresh(token);
      const response = ApiResponse.success(result, "Access token refreshed");

      response.cookies.set(COOKIE_NAMES.ACCESS_TOKEN, result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 15 * 60,
      });

      return response;
    } catch (error) {
      return handleApiError(error, "AuthController.refreshToken");
    }
  }

  static async logout() {
    const response = ApiResponse.success(null, "Logged out successfully");
    response.cookies.delete(COOKIE_NAMES.ACCESS_TOKEN);
    response.cookies.delete(COOKIE_NAMES.REFRESH_TOKEN);
    return response;
  }

  static async getSession(req: NextRequest) {
    const user = extractAuthUser(req);
    if (!user) {
      return ApiResponse.error("No active session found", HTTP_STATUS.UNAUTHORIZED);
    }
    return ApiResponse.success({ user }, "Active session retrieved");
  }
}
