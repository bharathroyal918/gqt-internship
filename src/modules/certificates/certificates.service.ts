import { dataStore } from "@/src/shared/config/dataStore";
import { CertificateService as CertUtil } from "@/src/shared/services/certificateService";
import { emailService } from "@/src/shared/services/emailService";

export class CertificatesService {
  static async issue(data: {
    studentId: string;
    internshipId: string;
    collegeCode?: string;
  }, userId?: string) {
    const student = dataStore.users.find((u) => u.id === data.studentId);
    const internship = dataStore.internships.find((i) => i.id === data.internshipId);

    if (!internship) {
      throw { statusCode: 404, message: "Internship role not found" };
    }

    const creds = CertUtil.generateCertificateCredentials(
      student?.usn || "1RV23CS041",
      internship.internshipCode || "GQT-INT-001",
      data.collegeCode || "1RV"
    );

    const certificate = {
      id: `cert_${Date.now()}`,
      certificateNumber: creds.certificateNumber,
      studentId: data.studentId,
      studentName: student?.fullName || "Ananya Sharma",
      usn: student?.usn || "1RV23CS041",
      internshipId: internship.id,
      internshipTitle: internship.title,
      companyName: internship.company,
      verificationCode: creds.verificationCode,
      qrVerificationUrl: creds.qrVerificationUrl,
      issueDate: creds.issueDate.toISOString().split("T")[0],
      pdfUrl: creds.pdfUrl,
      status: "ACTIVE",
    };

    dataStore.certificates.unshift(certificate);

    // Notify student via email
    if (student?.email) {
      emailService.enqueueEmail({
        to: student.email,
        subject: `Internship Completion Certificate Issued: ${internship.title}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Congratulations ${student.fullName}!</h2>
            <p>Your official VTU-verified internship certificate for <strong>${internship.title}</strong> at <strong>${internship.company}</strong> has been issued.</p>
            <p>Certificate Number: <strong>${certificate.certificateNumber}</strong></p>
            <p>Verification Code: <code>${certificate.verificationCode}</code></p>
            <a href="${certificate.qrVerificationUrl}" style="background: #0B5ED7; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px;">Verify Certificate Online</a>
          </div>
        `,
      });
    }

    dataStore.auditLogs.unshift({
      id: `aud_${Date.now()}`,
      entity: "Certificate",
      entityId: certificate.id,
      action: "ISSUE",
      newValue: certificate,
      userId,
      timestamp: new Date().toISOString(),
    });

    return certificate;
  }

  static async verify(code: string) {
    const cert = dataStore.certificates.find(
      (c) => c.verificationCode === code || c.certificateNumber === code
    );

    if (!cert) {
      throw { statusCode: 404, message: "Certificate not found or verification code is invalid" };
    }

    return {
      verified: true,
      certificateNumber: cert.certificateNumber,
      studentName: cert.studentName,
      usn: cert.usn,
      internshipTitle: cert.internshipTitle,
      companyName: cert.companyName,
      issueDate: cert.issueDate,
      status: cert.status,
      vtuAffiliationVerified: true,
      securityHash: cert.verificationCode,
    };
  }

  static async list() {
    return dataStore.certificates;
  }
}
