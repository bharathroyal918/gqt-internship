import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import internshipsData from "../data/internships.json";
import companiesData from "../data/companies.json";
import collegesData from "../data/colleges.json";
import applicantsData from "../data/applicants.json";
import circularsData from "../data/circulars.json";
import notificationsData from "../data/notifications.json";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting GQT Enterprise Database Seed...");

  // 1. Seed Roles & Permissions
  console.log("Creating System Roles...");
  const roles = [
    { name: "SUPER_ADMIN", displayName: "Super Administrator", description: "Full root access to all portal parameters and system operations" },
    { name: "ADMIN", displayName: "GQT Administrator", description: "Internal management access to colleges, internships, and users" },
    { name: "OPERATIONS", displayName: "Operations Team", description: "Day-to-day workflow coordination and candidate triage" },
    { name: "PLACEMENT_TEAM", displayName: "Placement Directorate", description: "College coordinator liaisons and institutional placement drives" },
    { name: "HR", displayName: "Corporate Talent Team", description: "Evaluations, technical interviews, and offer letters" },
    { name: "FINANCE", displayName: "Finance & Accounts", description: "Stipend distribution audits and Career Launch accounting" },
    { name: "CERTIFICATE_TEAM", displayName: "Credential Verification", description: "VTU cryptographic seal and certificate issuance" },
    { name: "STUDENT", displayName: "Student Applicant", description: "College student applying for internships and tracking certificates" },
    { name: "PLACEMENT_OFFICER", displayName: "College Placement Officer", description: "Institutional officer managing college students and NOCs" },
    { name: "COLLEGE_COORDINATOR", displayName: "Academic Coordinator", description: "Departmental internship coordinator" },
    { name: "COMPANY_HR", displayName: "Partner HR Representative", description: "Enterprise hiring partner managing candidate applications" },
    { name: "MENTOR", displayName: "Technical Mentor", description: "Industry practitioner guiding intern cohorts" },
    { name: "TRAINER", displayName: "Corporate Trainer", description: "Instructor conducting technical training modules" },
  ];

  const roleMap: Record<string, string> = {};
  for (const r of roles) {
    const roleRecord = await prisma.role.upsert({
      where: { name: r.name as any },
      update: {},
      create: {
        name: r.name as any,
        displayName: r.displayName,
        description: r.description,
        isSystem: true,
      },
    });
    roleMap[r.name] = roleRecord.id;
  }

  // 2. Seed Default Admin & Student Users
  console.log("Creating Root Users...");
  const defaultPasswordHash = await bcrypt.hash("Admin@123", 10);

  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@gqtech.in" },
    update: {},
    create: {
      fullName: "GQT Super Administrator",
      email: "admin@gqtech.in",
      phone: "+91 8049207800",
      passwordHash: defaultPasswordHash,
      roleId: roleMap["SUPER_ADMIN"],
      status: "ACTIVE",
      emailVerified: true,
      phoneVerified: true,
    },
  });

  const demoStudentUser = await prisma.user.upsert({
    where: { email: "student@gqtech.in" },
    update: {},
    create: {
      fullName: "Ananya Sharma",
      email: "student@gqtech.in",
      phone: "+91 9876543210",
      passwordHash: defaultPasswordHash,
      roleId: roleMap["STUDENT"],
      status: "ACTIVE",
      emailVerified: true,
      phoneVerified: true,
    },
  });

  // 3. Seed Colleges & Departments
  console.log("Seeding VTU Colleges...");
  const collegeMap: Record<string, string> = {};
  for (const c of collegesData as any[]) {
    const code = c.code || c.shortCode;
    const college = await prisma.college.upsert({
      where: { collegeCode: code },
      update: {},
      create: {
        collegeCode: code,
        collegeName: c.name,
        district: c.district,
        state: "Karnataka",
        university: "VTU",
        placementOfficerName: c.placementOfficer,
        contactEmail: c.contactEmail || c.officerEmail,
        csrEnabled: c.csrEligible ?? true,
        logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=021B49&color=fff&size=128&bold=true`,
      },
    });
    collegeMap[code] = college.id;

    // Create Departments
    const depts = ["CSE", "ISE", "AIML", "ECE", "ME"];
    for (const d of depts) {
      await prisma.department.upsert({
        where: { collegeId_code: { collegeId: college.id, code: d } },
        update: {},
        create: {
          departmentName: `${d} Department`,
          code: d,
          collegeId: college.id,
        },
      });
    }
  }

  // 4. Seed Companies
  console.log("Seeding Partner Companies...");
  const companyMap: Record<string, string> = {};
  for (const comp of companiesData.slice(0, 30)) {
    const slug = comp.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const company = await prisma.company.upsert({
      where: { name: comp.name },
      update: {},
      create: {
        name: comp.name,
        slug,
        industry: comp.domain,
        location: comp.location,
        description: comp.about,
        website: comp.website,
        tier: (comp.tier?.toUpperCase() as any) || "ENTERPRISE",
        hiringStatus: "HIRING_ACTIVE",
        verificationStatus: "VERIFIED",
        logo: comp.logo,
      },
    });
    companyMap[comp.name] = company.id;
  }

  // 5. Seed Internships
  console.log("Seeding Internships...");
  const firstCompanyId = Object.values(companyMap)[0];
  for (const int of internshipsData.slice(0, 50)) {
    const cId = companyMap[int.company] || firstCompanyId;
    const slug = int.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + int.id;
    await prisma.internship.upsert({
      where: { internshipCode: int.id },
      update: {},
      create: {
        internshipCode: int.id,
        title: int.title,
        slug,
        companyId: cId,
        mode: (int.mode?.toUpperCase()?.replace("-", "_") as any) || "HYBRID",
        location: int.location,
        duration: int.duration,
        applicationDeadline: new Date(int.deadline),
        eligibility: int.eligibility,
        skills: int.skills,
        description: `Comprehensive industry training internship focusing on ${int.title} with hands-on projects, industry mentorship, and VTU credit fulfillment.`,
        responsibilities: [
          "Participate in daily engineering standups and architectural reviews",
          "Develop enterprise-ready modules adhering to clean code principles",
          "Submit weekly digital logbooks signed by assigned industry mentor",
        ],
        learningOutcomes: [
          "Production deployment experience with CI/CD automation",
          "In-depth domain expertise in " + int.category,
        ],
        perks: ["Industry Certificate", "Flexible Hours", "Pre-Placement Interview"],
        stipend: int.stipend,
        stipendAmount: int.stipendAmount,
        seats: int.vacancies || 4,
        category: int.category,
        featured: true,
        published: true,
        status: "PUBLISHED",
      },
    });
  }

  // 6. Seed Circulars
  console.log("Seeding VTU Circulars...");
  for (const circ of circularsData as any[]) {
    await prisma.circular.upsert({
      where: { circularNumber: circ.refNo },
      update: {},
      create: {
        circularNumber: circ.refNo,
        title: circ.title,
        category: (circ.category?.toUpperCase() as any) || "LATEST",
        description: circ.description || circ.excerpt || circ.content || "",
        isPinned: circ.pinned || false,
        isPublished: true,
        priority: "NORMAL",
        issueDate: new Date(circ.date),
      },
    });
  }

  // 7. Seed Student Profile
  console.log("Seeding Student Profile...");
  const rvceCollegeId = Object.values(collegeMap)[0];
  await prisma.student.upsert({
    where: { userId: demoStudentUser.id },
    update: {},
    create: {
      userId: demoStudentUser.id,
      universityNumber: "1RV23CS041",
      fullName: "Ananya Sharma",
      email: "student@gqtech.in",
      phone: "+91 9876543210",
      branch: "Computer Science & Engineering",
      semester: 6,
      collegeId: rvceCollegeId,
      graduationYear: 2027,
      cgpa: 8.92,
      resumeUrl: "https://res.cloudinary.com/gqt/resumes/sample_resume.pdf",
      skills: ["React", "TypeScript", "Python", "TailwindCSS", "Node.js"],
      profileCompletion: 85,
    },
  });

  console.log("✅ GQT Enterprise Database Seed Completed Successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
