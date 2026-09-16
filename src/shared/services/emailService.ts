import nodemailer, { Transporter } from "nodemailer";
import { env } from "../config/env";
import { logger } from "../utils/logger";
import { emailQueue } from "../queues";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private transporter: Transporter | null = null;

  constructor() {
    try {
      this.transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_PORT === 465,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASSWORD,
        },
      });
    } catch (err) {
      logger.warn("SMTP Transporter setup failed. Emails will be logged in mock mode.");
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    logger.info({ to: options.to, subject: options.subject }, "Sending transactional email...");

    // In local dev without live SMTP credentials, log preview safely
    if (env.NODE_ENV === "development" && env.SMTP_PASSWORD === "mock_smtp_password") {
      logger.info(
        `[MOCK EMAIL DISPATCHED] To: ${options.to} | Subject: ${options.subject}`
      );
      return true;
    }

    try {
      if (this.transporter) {
        await this.transporter.sendMail({
          from: env.SMTP_FROM,
          to: options.to,
          subject: options.subject,
          html: options.html,
          text: options.text,
        });
        return true;
      }
      return false;
    } catch (error) {
      logger.error({ error, to: options.to }, "Failed to send email via SMTP");
      return false;
    }
  }

  async enqueueEmail(options: EmailOptions) {
    await emailQueue.add("send_email", options);
  }

  // --- Prebuilt Responsive Corporate HTML Email Templates ---

  getWelcomeEmailTemplate(name: string, role: string): string {
    return `
      <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
          <div style="background: #021B49; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Global Quest Technologies</h1>
            <p style="color: #93c5fd; margin: 6px 0 0 0; font-size: 13px;">VTU Affiliated Corporate Internship Portal</p>
          </div>
          <div style="padding: 30px; color: #1e293b; line-height: 1.6;">
            <h2 style="color: #0F172A; font-size: 18px;">Welcome to GQT, ${name}!</h2>
            <p>Your account as <strong>${role}</strong> has been successfully registered. You can now access verified corporate internships, VTU credit tracking, and real-time application updates.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${env.NEXT_PUBLIC_APP_URL}/login" style="background: #0B5ED7; color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Access Your Portal</a>
            </div>
            <p style="font-size: 12px; color: #64748b; border-top: 1px solid #f1f5f9; padding-top: 20px;">For technical support, contact us at support@gqtech.in.</p>
          </div>
        </div>
      </div>
    `;
  }

  getOtpEmailTemplate(otp: string): string {
    return `
      <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px;">
        <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 30px; border: 1px solid #e2e8f0; text-align: center;">
          <h2 style="color: #021B49; margin-top: 0;">Verification Code</h2>
          <p style="color: #475569; font-size: 14px;">Use the following One-Time Password (OTP) to complete your login. This code is valid for 10 minutes.</p>
          <div style="background: #eff6ff; border: 2px dashed #0B5ED7; border-radius: 12px; padding: 16px; margin: 24px 0; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #0B5ED7;">
            ${otp}
          </div>
          <p style="font-size: 12px; color: #94a3b8;">If you did not request this OTP, please ignore this email.</p>
        </div>
      </div>
    `;
  }

  getApplicationStatusEmailTemplate(studentName: string, internshipTitle: string, status: string, remarks?: string): string {
    return `
      <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 30px; border: 1px solid #e2e8f0;">
          <h2 style="color: #021B49; margin-top: 0;">Application Status Update</h2>
          <p style="color: #334155;">Hello <strong>${studentName}</strong>,</p>
          <p>Your application status for <strong>${internshipTitle}</strong> has been updated to:</p>
          <div style="display: inline-block; background: #ecfdf5; color: #047857; font-weight: bold; padding: 8px 16px; border-radius: 8px; font-size: 14px; margin: 12px 0;">
            ${status.replace(/_/g, " ")}
          </div>
          ${remarks ? `<p style="background: #f8fafc; padding: 12px; border-left: 4px solid #0B5ED7; color: #475569; font-size: 13px;">${remarks}</p>` : ""}
          <p style="color: #475569; font-size: 13px;">Login to your student dashboard to view interview links, offer letters, or next steps.</p>
          <div style="margin-top: 24px;">
            <a href="${env.NEXT_PUBLIC_APP_URL}/dashboard/applications" style="background: #0B5ED7; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: bold;">View Application</a>
          </div>
        </div>
      </div>
    `;
  }
}

export const emailService = new EmailService();
