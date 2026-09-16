import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env";
import { logger } from "../utils/logger";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface UploadResult {
  url: string;
  publicId: string;
  format: string;
  bytes: number;
}

export class CloudinaryService {
  static async uploadBuffer(
    buffer: Buffer,
    folder: "resumes" | "certificates" | "logos" | "banners" | "avatars",
    originalFilename?: string
  ): Promise<UploadResult> {
    logger.info({ folder, filename: originalFilename }, "Uploading media to Cloudinary...");

    // In local development without live Cloudinary API keys, generate mock secure URL
    if (env.CLOUDINARY_API_SECRET === "gqt_cloudinary_secure_api_secret_key") {
      const mockId = `mock_${folder}_${Date.now()}`;
      return {
        url: `https://res.cloudinary.com/${env.CLOUDINARY_CLOUD_NAME}/image/upload/v1710000000/gqt/${folder}/${mockId}.pdf`,
        publicId: `gqt/${folder}/${mockId}`,
        format: "pdf",
        bytes: buffer.length,
      };
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `gqt/${folder}`,
          resource_type: "auto",
        },
        (error, result) => {
          if (error || !result) {
            logger.error({ error }, "Cloudinary upload stream failed");
            return reject(error);
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            bytes: result.bytes,
          });
        }
      );

      uploadStream.end(buffer);
    });
  }
}
