import { dataStore } from "@/src/shared/config/dataStore";
import { cacheService } from "@/src/shared/services/cacheService";

export class InternshipsService {
  static async list(params: {
    page: number;
    limit: number;
    skip: number;
    search?: string;
    category?: string;
    mode?: string;
    location?: string;
    minStipend?: number;
    status?: string;
    featured?: boolean;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) {
    let list = [...dataStore.internships];

    // Status filter
    if (params.status) {
      list = list.filter((i) => i.status?.toLowerCase() === params.status?.toLowerCase());
    } else {
      // By default for public portal, show Active / Published
      list = list.filter((i) => i.status !== "ARCHIVED" && i.status !== "DRAFT");
    }

    // Featured filter
    if (params.featured !== undefined) {
      list = list.filter((i) => i.featured === params.featured);
    }

    // Category filter
    if (params.category && params.category !== "All") {
      list = list.filter((i) => i.category?.toLowerCase() === params.category?.toLowerCase());
    }

    // Mode filter
    if (params.mode && params.mode !== "All Modes") {
      list = list.filter((i) => i.mode?.toLowerCase() === params.mode?.toLowerCase());
    }

    // Location filter
    if (params.location && params.location !== "All Locations") {
      list = list.filter((i) => i.location?.toLowerCase().includes(params.location!.toLowerCase()));
    }

    // Stipend filter
    if (params.minStipend) {
      list = list.filter((i) => (i.stipendAmount || 0) >= params.minStipend!);
    }

    // Search query
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (i) =>
          i.title?.toLowerCase().includes(q) ||
          i.company?.toLowerCase().includes(q) ||
          i.location?.toLowerCase().includes(q) ||
          i.skills?.some((s: string) => s.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (params.sortBy === "stipend") {
      list.sort((a, b) =>
        params.sortOrder === "asc"
          ? (a.stipendAmount || 0) - (b.stipendAmount || 0)
          : (b.stipendAmount || 0) - (a.stipendAmount || 0)
      );
    } else if (params.sortBy === "deadline") {
      list.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    } else {
      // Default: postedDate or createdAt
      list.sort((a, b) => new Date(b.postedDate || 0).getTime() - new Date(a.postedDate || 0).getTime());
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

  static async getById(idOrSlug: string) {
    const internship = dataStore.internships.find((i) => i.id === idOrSlug || i.slug === idOrSlug);
    if (!internship) {
      throw { statusCode: 404, message: "Internship role not found" };
    }
    return internship;
  }

  static async create(data: any, userId?: string) {
    const randomCode = `GQT-INT-${String(dataStore.internships.length + 1).padStart(3, "0")}`;
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();

    const company = dataStore.companies.find((c) => c.id === data.companyId || c.name === data.companyId);

    const newRole = {
      id: `gqt-int-${String(dataStore.internships.length + 1).padStart(3, "0")}`,
      internshipCode: randomCode,
      title: data.title,
      slug,
      companyId: company ? company.id : data.companyId,
      company: company ? company.name : "Global Partner",
      companyLogo: company?.logo || "https://ui-avatars.com/api/?name=Partner&background=0B5ED7&color=fff",
      category: data.category || "AI Internship",
      mode: data.mode || "Hybrid",
      location: data.location || "Bangalore",
      duration: data.duration || "3 Months",
      stipend: data.stipend || "₹12,000 / month",
      stipendAmount: data.stipendAmount || 12000,
      seats: data.seats || 5,
      deadline: data.applicationDeadline || "2026-11-30",
      postedDate: new Date().toISOString().split("T")[0],
      eligibility: data.eligibility,
      skills: data.skills || [],
      description: data.description,
      responsibilities: data.responsibilities || [],
      learningOutcomes: data.learningOutcomes || [],
      perks: data.perks || [],
      certificateAvailable: true,
      status: data.published ? "Active" : "Draft",
      featured: data.featured || false,
      published: data.published ?? true,
      createdBy: userId,
      createdAt: new Date().toISOString(),
    };

    dataStore.internships.unshift(newRole);
    await cacheService.invalidatePattern("internships*");

    // Log audit
    dataStore.auditLogs.unshift({
      id: `aud_${Date.now()}`,
      entity: "Internship",
      entityId: newRole.id,
      action: "CREATE",
      newValue: newRole,
      userId,
      timestamp: new Date().toISOString(),
    });

    return newRole;
  }

  static async update(id: string, data: any, userId?: string) {
    const index = dataStore.internships.findIndex((i) => i.id === id);
    if (index === -1) {
      throw { statusCode: 404, message: "Internship not found" };
    }

    const old = { ...dataStore.internships[index] };
    dataStore.internships[index] = {
      ...dataStore.internships[index],
      ...data,
      updatedAt: new Date().toISOString(),
      updatedBy: userId,
    };

    await cacheService.invalidatePattern("internships*");

    dataStore.auditLogs.unshift({
      id: `aud_${Date.now()}`,
      entity: "Internship",
      entityId: id,
      action: "UPDATE",
      oldValue: old,
      newValue: dataStore.internships[index],
      userId,
      timestamp: new Date().toISOString(),
    });

    return dataStore.internships[index];
  }

  static async delete(id: string, userId?: string) {
    const index = dataStore.internships.findIndex((i) => i.id === id);
    if (index === -1) {
      throw { statusCode: 404, message: "Internship not found" };
    }

    const removed = dataStore.internships.splice(index, 1)[0];
    await cacheService.invalidatePattern("internships*");

    dataStore.auditLogs.unshift({
      id: `aud_${Date.now()}`,
      entity: "Internship",
      entityId: id,
      action: "DELETE",
      oldValue: removed,
      userId,
      timestamp: new Date().toISOString(),
    });

    return { id, message: "Internship deleted successfully" };
  }

  static async getRelated(id: string, limit = 3) {
    const target = dataStore.internships.find((i) => i.id === id);
    if (!target) return [];

    return dataStore.internships
      .filter((i) => i.id !== id && i.category === target.category)
      .slice(0, limit);
  }
}
