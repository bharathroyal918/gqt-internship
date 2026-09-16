import { NextRequest } from "next/server";
import { StudentsService } from "./students.service";
import { ApiResponse } from "@/src/shared/utils/apiResponse";
import { studentProfileUpdateSchema } from "@/src/shared/validators";
import { handleApiError } from "@/src/shared/middlewares/errorHandler";
import { extractAuthUser } from "@/src/shared/middlewares/authMiddleware";
import { HTTP_STATUS } from "@/src/shared/config/constants";
import { CloudinaryService } from "@/src/shared/services/cloudinaryService";

export class StudentsController {
  static async getMe(req: NextRequest) {
    try {
      const user = extractAuthUser(req);
      if (!user) {
        return ApiResponse.error("Authentication required", HTTP_STATUS.UNAUTHORIZED);
      }

      const profile = await StudentsService.getProfile(user.userId);
      return ApiResponse.success(profile, "Student profile retrieved");
    } catch (error) {
      return handleApiError(error, "StudentsController.getMe");
    }
  }

  static async updateMe(req: NextRequest) {
    try {
      const user = extractAuthUser(req);
      if (!user) {
        return ApiResponse.error("Authentication required", HTTP_STATUS.UNAUTHORIZED);
      }

      const body = await req.json();
      const validated = studentProfileUpdateSchema.parse(body);
      const updated = await StudentsService.updateProfile(user.userId, validated);

      return ApiResponse.success(updated, "Profile updated successfully");
    } catch (error) {
      return handleApiError(error, "StudentsController.updateMe");
    }
  }

  static async uploadResume(req: NextRequest) {
    try {
      const user = extractAuthUser(req);
      if (!user) {
        return ApiResponse.error("Authentication required", HTTP_STATUS.UNAUTHORIZED);
      }

      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      if (!file) {
        return ApiResponse.error("No file uploaded", HTTP_STATUS.BAD_REQUEST);
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await CloudinaryService.uploadBuffer(buffer, "resumes", file.name);

      await StudentsService.updateProfile(user.userId, { resumeUrl: result.url });

      return ApiResponse.success(result, "Resume uploaded successfully");
    } catch (error) {
      return handleApiError(error, "StudentsController.uploadResume");
    }
  }

  static async getSaved(req: NextRequest) {
    try {
      const user = extractAuthUser(req);
      if (!user) {
        return ApiResponse.error("Authentication required", HTTP_STATUS.UNAUTHORIZED);
      }

      const saved = await StudentsService.getSaved(user.userId);
      return ApiResponse.success(saved, "Saved internships retrieved");
    } catch (error) {
      return handleApiError(error, "StudentsController.getSaved");
    }
  }

  static async toggleSave(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const user = extractAuthUser(req);
      if (!user) {
        return ApiResponse.error("Authentication required", HTTP_STATUS.UNAUTHORIZED);
      }

      const { id } = await params;
      const result = await StudentsService.toggleSave(user.userId, id);
      return ApiResponse.success(result, result.message);
    } catch (error) {
      return handleApiError(error, "StudentsController.toggleSave");
    }
  }

  static async getCertificates(req: NextRequest) {
    try {
      const user = extractAuthUser(req);
      if (!user) {
        return ApiResponse.error("Authentication required", HTTP_STATUS.UNAUTHORIZED);
      }

      const certs = await StudentsService.getCertificates(user.userId);
      return ApiResponse.success(certs, "Certificates retrieved");
    } catch (error) {
      return handleApiError(error, "StudentsController.getCertificates");
    }
  }
}
