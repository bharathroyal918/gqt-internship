import internshipsData from "@/data/internships.json";
import companiesData from "@/data/companies.json";
import collegesData from "@/data/colleges.json";
import applicantsData from "@/data/applicants.json";
import circularsData from "@/data/circulars.json";
import notificationsData from "@/data/notifications.json";
import categoriesData from "@/data/categories.json";

// In-memory mutable operational store for development & mock fallback
class InMemoryDataStore {
  internships: any[] = [...internshipsData];
  companies: any[] = [...companiesData];
  colleges: any[] = [...collegesData];
  applicants: any[] = [...applicantsData];
  circulars: any[] = [...circularsData];
  notifications: any[] = [...notificationsData];
  categories: any[] = [...categoriesData];
  users: any[] = [
    {
      id: "usr-admin-001",
      fullName: "GQT Super Administrator",
      email: "admin@gqtech.in",
      phone: "+91 8049207800",
      passwordHash: "$2a$10$wO3l5hZ5dM6h3wHhHhHhHeP6xK3iH7f9j3y4m7c2l1q8s9t0u1v2w", // Admin@123
      role: "SUPER_ADMIN",
      roleId: "role-super-admin",
      status: "ACTIVE",
      emailVerified: true,
      phoneVerified: true,
    },
    {
      id: "usr-student-001",
      fullName: "Ananya Sharma",
      email: "student@gqtech.in",
      phone: "+91 9876543210",
      passwordHash: "$2a$10$wO3l5hZ5dM6h3wHhHhHhHeP6xK3iH7f9j3y4m7c2l1q8s9t0u1v2w", // Admin@123
      role: "STUDENT",
      roleId: "role-student",
      status: "ACTIVE",
      emailVerified: true,
      phoneVerified: true,
      usn: "1RV23CS041",
      collegeId: "col-1",
      branch: "Computer Science & Engineering",
      semester: 6,
      cgpa: 8.92,
    },
  ];
  partners: any[] = [
    { id: "part-1", companyName: "Infosys Labs", logoUrl: "https://ui-avatars.com/api/?name=Infosys&background=0B5ED7&color=fff", priority: 1, isVisible: true },
    { id: "part-2", companyName: "TCS Research", logoUrl: "https://ui-avatars.com/api/?name=TCS&background=021B49&color=fff", priority: 2, isVisible: true },
    { id: "part-3", companyName: "Wipro Digital", logoUrl: "https://ui-avatars.com/api/?name=Wipro&background=0B5ED7&color=fff", priority: 3, isVisible: true },
    { id: "part-4", companyName: "Bosch Engineering", logoUrl: "https://ui-avatars.com/api/?name=Bosch&background=16A34A&color=fff", priority: 4, isVisible: true },
    { id: "part-5", companyName: "Titan Company", logoUrl: "https://ui-avatars.com/api/?name=Titan&background=F59E0B&color=fff", priority: 5, isVisible: true },
  ];
  certificates: any[] = [
    {
      id: "cert-001",
      certificateNumber: "GQT-VTU-2026-94812",
      studentId: "usr-student-001",
      studentName: "Ananya Sharma",
      usn: "1RV23CS041",
      internshipId: "gqt-int-001",
      internshipTitle: "Generative AI Research Intern",
      companyName: "Titan Company Ltd",
      verificationCode: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      issueDate: "2026-08-30",
      pdfUrl: "https://res.cloudinary.com/gqt/certificates/GQT-VTU-2026-94812.pdf",
      status: "ACTIVE",
    },
  ];
  careerLaunches: any[] = [
    {
      id: "cl-001",
      studentName: "Rahul Gowda",
      usn: "1BM23IS082",
      courseName: "Full Stack Cloud Native Engineering",
      paymentPlan: "INSTALLMENTS",
      admissionStatus: "ENROLLED",
      batchCode: "CL-2026-B1",
      counselorName: "Priya V.",
      totalFee: 25000,
      amountPaid: 15000,
      remainingFee: 10000,
      paymentStatus: "PARTIAL",
    },
  ];
  csrDrives: any[] = [
    {
      id: "csr-001",
      driveName: "Infosys Springboard AI for Rural Engineering",
      collegeName: "Government Engineering College, Hassan",
      collegeId: "col-22",
      coordinatorName: "Dr. K. S. Manjunath",
      status: "ONGOING",
      startDate: "2026-08-01",
      endDate: "2026-10-31",
      batchCode: "CSR-INF-2026-04",
      groupLink: "https://chat.whatsapp.com/mock-csr-group-01",
      whatsAppGroupId: "wa_grp_992817412",
    },
  ];
  auditLogs: any[] = [
    {
      id: "aud-001",
      entity: "Internship",
      entityId: "gqt-int-001",
      action: "PUBLISH",
      oldValue: { status: "DRAFT" },
      newValue: { status: "PUBLISHED" },
      ipAddress: "106.51.240.11",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      userId: "usr-admin-001",
      timestamp: new Date().toISOString(),
    },
  ];
  contactEnquiries: any[] = [];
  newsletters: any[] = [];
  systemSettings: Record<string, string> = {
    orgName: "Global Quest Technologies",
    orgEmail: "admin@gqtech.in",
    orgPhone: "+91 080 4920 7800",
    vtuAffiliationCode: "VTU-GQT-2026-REG",
    smtpHost: "smtp.sendgrid.net",
    smtpUser: "apikey",
    whatsappApiToken: "wh_sec_9948271049281",
    razorpayKey: "rzp_live_8984920194",
    cloudinaryCloud: "gqt-media-cdn",
  };
}

const globalForDataStore = globalThis as unknown as {
  dataStore: InMemoryDataStore | undefined;
};

export const dataStore = globalForDataStore.dataStore ?? new InMemoryDataStore();
if (process.env.NODE_ENV !== "production") globalForDataStore.dataStore = dataStore;
