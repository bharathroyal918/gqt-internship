import { z } from "zod";

// --- Auth Validators ---
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  role: z.enum(["STUDENT", "PLACEMENT_OFFICER", "COMPANY_HR"]).default("STUDENT"),
  collegeId: z.string().uuid().optional(),
  usn: z.string().optional(),
  branch: z.string().optional(),
});

export const sendOtpSchema = z.object({
  identifier: z.string().min(3, "Valid email or phone number required"),
  type: z.enum(["LOGIN", "PASSWORD_RESET", "PHONE_VERIFY"]).default("LOGIN"),
});

export const verifyOtpSchema = z.object({
  identifier: z.string().min(3, "Valid email or phone number required"),
  otp: z.string().length(6, "OTP must be 6 digits"),
  type: z.enum(["LOGIN", "PASSWORD_RESET", "PHONE_VERIFY"]).default("LOGIN"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

// --- Internship Validators ---
export const internshipCreateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  companyId: z.string().min(1, "Company is required"),
  category: z.string().default("AI Internship"),
  mode: z.enum(["HYBRID", "REMOTE", "ON_SITE"]).default("HYBRID"),
  location: z.string().min(2, "Location is required"),
  duration: z.string().default("3 Months"),
  stipend: z.string().default("₹12,000 / month"),
  stipendAmount: z.number().default(12000),
  seats: z.number().int().positive().default(5),
  applicationDeadline: z.string().or(z.date()),
  eligibility: z.string().min(5, "Eligibility required"),
  skills: z.array(z.string()).default([]),
  description: z.string().min(10, "Description required"),
  responsibilities: z.array(z.string()).default([]),
  learningOutcomes: z.array(z.string()).default([]),
  perks: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

export const internshipUpdateSchema = internshipCreateSchema.partial();

// --- Application Validators ---
export const applicationCreateSchema = z.object({
  internshipId: z.string().min(1, "Internship ID required"),
  coverLetter: z.string().optional(),
  resumeSnapshotUrl: z.string().url("Valid resume URL required").optional(),
});

export const applicationStatusUpdateSchema = z.object({
  status: z.enum([
    "APPLIED",
    "UNDER_REVIEW",
    "SHORTLISTED",
    "INTERVIEW_SCHEDULED",
    "SELECTED",
    "REJECTED",
    "OFFER_RELEASED",
    "CERTIFICATE_ELIGIBLE",
    "WITHDRAWN",
  ]),
  remarks: z.string().optional(),
});

export const interviewScheduleSchema = z.object({
  interviewRound: z.number().int().default(1),
  roundName: z.string().default("Technical Round 1"),
  date: z.string().or(z.date()),
  time: z.string().default("11:00 AM IST"),
  meetingLink: z.string().url().optional(),
  interviewerName: z.string().optional(),
  interviewerEmail: z.string().email().optional(),
});

// --- Student Profile Validators ---
export const studentProfileUpdateSchema = z.object({
  fullName: z.string().optional(),
  phone: z.string().optional(),
  branch: z.string().optional(),
  semester: z.number().int().min(1).max(8).optional(),
  cgpa: z.number().min(0).max(10).optional(),
  resumeUrl: z.string().url().optional(),
  linkedInUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
  skills: z.array(z.string()).optional(),
  projects: z.array(z.any()).optional(),
  certifications: z.array(z.any()).optional(),
});

// --- Company Validators ---
export const companyCreateSchema = z.object({
  name: z.string().min(2, "Company name required"),
  industry: z.string().min(2, "Industry required"),
  website: z.string().url().optional().or(z.literal("")),
  location: z.string().min(2, "Location required"),
  description: z.string().min(10, "Description required"),
  tier: z.enum(["ENTERPRISE", "GROWTH", "STARTUP", "GLOBAL"]).default("ENTERPRISE"),
  hiringStatus: z.enum(["HIRING_ACTIVE", "HIRING_PAUSED", "CLOSED"]).default("HIRING_ACTIVE"),
});

// --- Circular Validators ---
export const circularCreateSchema = z.object({
  circularNumber: z.string().min(3),
  title: z.string().min(5),
  category: z.enum(["LATEST", "PLACEMENT", "EXAM", "TRAINING"]).default("LATEST"),
  description: z.string().min(10),
  richTextContent: z.string().optional(),
  attachmentUrl: z.string().url().optional(),
  isPinned: z.boolean().default(false),
  priority: z.enum(["NORMAL", "URGENT", "CRITICAL"]).default("NORMAL"),
});

// --- Notification Broadcast Validator ---
export const notificationBroadcastSchema = z.object({
  audience: z.enum(["ALL", "STUDENTS", "COLLEGES", "COMPANIES", "ADMINS"]).default("ALL"),
  title: z.string().min(3),
  description: z.string().min(5),
  type: z.enum(["PUSH", "EMAIL", "WHATSAPP", "BANNER", "IN_APP"]).default("IN_APP"),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).default("NORMAL"),
});

// --- Contact & Newsletter Validators ---
export const contactEnquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export const newsletterSubscribeSchema = z.object({
  email: z.string().email(),
  source: z.string().default("FOOTER"),
});
