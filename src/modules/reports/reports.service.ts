import { dataStore } from "@/src/shared/config/dataStore";
import { ReportService as CsvUtil } from "@/src/shared/services/reportService";

export class ReportsService {
  static async exportApplications(format: "csv" | "json" = "csv") {
    const rows = dataStore.applicants.map((a) => ({
      ApplicationID: a.id,
      CandidateName: a.name,
      USN: a.usn,
      College: a.college,
      RoleApplied: a.roleApplied,
      Company: a.company,
      Status: a.status,
      CGPA: a.cgpa,
      Branch: a.branch,
      AppliedDate: a.appliedDate,
    }));

    if (format === "json") return rows;
    return CsvUtil.generateCsv(rows);
  }

  static async exportColleges(format: "csv" | "json" = "csv") {
    const rows = dataStore.colleges.map((c) => ({
      CollegeCode: c.code,
      CollegeName: c.name,
      District: c.district,
      Zone: c.zone,
      StudentsCount: c.studentsCount,
      ActiveInternships: c.activeInternships,
      PlacementOfficer: c.placementOfficer,
      Email: c.contactEmail,
    }));

    if (format === "json") return rows;
    return CsvUtil.generateCsv(rows);
  }

  static async exportInternships(format: "csv" | "json" = "csv") {
    const rows = dataStore.internships.map((i) => ({
      InternshipCode: i.id,
      Title: i.title,
      Company: i.company,
      Location: i.location,
      Mode: i.mode,
      Duration: i.duration,
      Stipend: i.stipend,
      Deadline: i.deadline,
      Category: i.category,
      Status: i.status,
    }));

    if (format === "json") return rows;
    return CsvUtil.generateCsv(rows);
  }
}
