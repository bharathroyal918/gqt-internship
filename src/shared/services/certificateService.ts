import crypto from "crypto";
import { env } from "../config/env";
import { logger } from "../utils/logger";

export interface GeneratedCertificate {
  certificateNumber: string;
  verificationCode: string;
  qrVerificationUrl: string;
  pdfUrl: string;
  issueDate: Date;
}

export class CertificateService {
  static generateCertificateCredentials(
    studentUsn: string,
    internshipCode: string,
    collegeCode: string
  ): GeneratedCertificate {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const certificateNumber = `GQT-VTU-2026-${randomSuffix}`;

    // Cryptographic SHA-256 hash incorporating USN, Code, College, and timestamp
    const rawData = `${certificateNumber}:${studentUsn}:${internshipCode}:${collegeCode}:${Date.now()}`;
    const verificationCode = crypto.createHash("sha256").update(rawData).digest("hex");

    const qrVerificationUrl = `${env.NEXT_PUBLIC_APP_URL}/api/v1/certificates/verify/${verificationCode}`;
    const pdfUrl = `${env.NEXT_PUBLIC_APP_URL}/certificates/${certificateNumber}.pdf`;

    logger.info(
      { certificateNumber, studentUsn, verificationCode: verificationCode.substring(0, 12) + "..." },
      "Generated verifiable certificate credentials"
    );

    return {
      certificateNumber,
      verificationCode,
      qrVerificationUrl,
      pdfUrl,
      issueDate: new Date(),
    };
  }
}
