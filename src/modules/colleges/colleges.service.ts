import { dataStore } from "@/src/shared/config/dataStore";
import { ReportService } from "@/src/shared/services/reportService";

export class CollegesService {
  static async list(params: {
    page: number;
    limit: number;
    skip: number;
    search?: string;
    district?: string;
  }) {
    let list = [...dataStore.colleges];

    if (params.district && params.district !== "All Districts") {
      list = list.filter((c) => c.district?.toLowerCase() === params.district?.toLowerCase());
    }

    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name?.toLowerCase().includes(q) ||
          c.code?.toLowerCase().includes(q) ||
          c.district?.toLowerCase().includes(q)
      );
    }

    const total = list.length;
    const paginated = list.slice(params.skip, params.skip + params.limit);

    return {
      items: paginated,
      pagination: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages: Math.ceil(total / params.limit) || 1,
      },
    };
  }

  static async getById(id: string) {
    const college = dataStore.colleges.find((c) => c.id === id || c.code === id);
    if (!college) {
      throw { statusCode: 404, message: "College institution not found" };
    }
    return college;
  }

  static async create(data: any, userId?: string) {
    const newCollege = {
      id: `col-${dataStore.colleges.length + 1}`,
      code: data.code || `VTU-${Date.now().toString().slice(-4)}`,
      name: data.name,
      district: data.district || "Bangalore Urban",
      zone: data.zone || "Bangalore Region",
      studentsCount: 0,
      activeInternships: 0,
      placementOfficer: data.placementOfficer || "Placement Directorate",
      contactEmail: data.contactEmail || "placement@vtu-college.edu.in",
      csrEligible: data.csrEligible ?? true,
      logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=021B49&color=fff&size=128&bold=true`,
      departments: ["CSE", "ISE", "AIML", "ECE", "ME"],
      createdAt: new Date().toISOString(),
    };

    dataStore.colleges.unshift(newCollege);

    dataStore.auditLogs.unshift({
      id: `aud_${Date.now()}`,
      entity: "College",
      entityId: newCollege.id,
      action: "CREATE",
      newValue: newCollege,
      userId,
      timestamp: new Date().toISOString(),
    });

    return newCollege;
  }

  static async exportStudentsCsv(collegeId?: string) {
    let students = dataStore.users.filter((u) => u.role === "STUDENT");
    if (collegeId) {
      students = students.filter((s) => s.collegeId === collegeId);
    }

    const exportRows = students.map((s) => ({
      ID: s.id,
      FullName: s.fullName,
      USN: s.usn || "N/A",
      Email: s.email,
      Phone: s.phone || "N/A",
      Branch: s.branch || "CSE",
      Semester: s.semester || 6,
      CGPA: s.cgpa || 8.5,
      Status: s.status,
    }));

    return ReportService.generateCsv(exportRows);
  }
}
