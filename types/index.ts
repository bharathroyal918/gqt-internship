export type InternshipMode = "Remote" | "Hybrid" | "On-site";
export type InternshipType = "Full-time" | "Part-time" | "Academic VTU" | "Summer Internship";
export type InternshipStatus = "published" | "draft" | "archived" | "closed";

export interface Internship {
  id: string;
  title: string;
  companyId: string;
  company: string;
  companyLogo: string;
  location: string;
  mode: InternshipMode;
  type: InternshipType;
  duration: string;
  stipend: string;
  stipendAmount: number;
  category: string;
  skills: string[];
  deadline: string;
  postedDate: string;
  vacancies: number;
  eligibility: string;
  responsibilities: string[];
  learningOutcomes: string[];
  certificateProvided: boolean;
  featured: boolean;
  status: InternshipStatus;
  applicantsCount: number;
  bannerImage?: string;
  aboutRole?: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  domain: string;
  location: string;
  openRoles: number;
  rating: number;
  reviewsCount: number;
  website: string;
  linkedin: string;
  about: string;
  tier: "Enterprise" | "Global Partner" | "Startup" | "Scale-up";
  verified: boolean;
  foundedYear: number;
  employees: string;
}

export type ApplicationStatus =
  | "Applied"
  | "Under Review"
  | "Shortlisted"
  | "Interview"
  | "Selected"
  | "Rejected";

export interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  usn: string;
  collegeId: string;
  college: string;
  degree: string;
  branch: string;
  cgpa: number;
  graduationYear: number;
  internshipId: string;
  internshipTitle: string;
  companyName: string;
  appliedDate: string;
  status: ApplicationStatus;
  resumeUrl: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  skills: string[];
  reviewerNotes?: string;
  interviewScheduled?: {
    date: string;
    time: string;
    mode: string;
    meetLink: string;
  };
}

export interface College {
  id: string;
  name: string;
  shortCode: string;
  district: string;
  state: string;
  university: string;
  placementOfficer: string;
  officerEmail: string;
  officerPhone: string;
  accreditation: string;
  established: number;
  activeStudents: number;
  assignedInternships: number;
  status: "Active" | "Pending" | "Suspended";
  logo?: string;
}

export type CircularCategory = "Latest" | "Placement" | "Exam" | "Training";
export type CircularPriority = "Urgent" | "High" | "Normal";

export interface Circular {
  id: string;
  title: string;
  refNo: string;
  category: CircularCategory;
  date: string;
  priority: CircularPriority;
  excerpt: string;
  content: string;
  pinned: boolean;
  showInTicker: boolean;
  pdfUrl?: string;
  department?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: "application" | "circular" | "interview" | "system";
  read: boolean;
  link?: string;
  audience?: "all" | "students" | "colleges" | "companies";
}

export interface Testimonial {
  id: string;
  name: string;
  college: string;
  branch: string;
  batch: string;
  role: string;
  company: string;
  stipend: string;
  photo: string;
  rating: number;
  feedback: string;
  videoBadge: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Application Process" | "VTU Guidelines" | "Certificates" | "Stipend & Offers";
}

export interface InternshipCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
  icon: string;
  logo?: string;
  internetSource?: string;
  popularTech?: string[];
  description: string;
  accentColor: string;
  bgGradient: string;
}
