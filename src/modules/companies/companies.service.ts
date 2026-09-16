import { dataStore } from "@/src/shared/config/dataStore";

export class CompaniesService {
  static async list(params: {
    page: number;
    limit: number;
    skip: number;
    search?: string;
    tier?: string;
    industry?: string;
  }) {
    let list = [...dataStore.companies];

    if (params.tier && params.tier !== "All Tiers") {
      list = list.filter((c) => c.tier?.toLowerCase() === params.tier?.toLowerCase());
    }

    if (params.industry && params.industry !== "All Domains") {
      list = list.filter((c) => c.domain?.toLowerCase() === params.industry?.toLowerCase());
    }

    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name?.toLowerCase().includes(q) ||
          c.domain?.toLowerCase().includes(q) ||
          c.location?.toLowerCase().includes(q)
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
    const company = dataStore.companies.find((c) => c.id === id);
    if (!company) {
      throw { statusCode: 404, message: "Company not found" };
    }

    const openRoles = dataStore.internships.filter(
      (i) => i.companyId === id || i.company === company.name
    );

    return {
      ...company,
      openInternships: openRoles,
    };
  }

  static async create(data: any, userId?: string) {
    const newCompany = {
      id: `comp-${dataStore.companies.length + 1}`,
      name: data.name,
      domain: data.industry,
      location: data.location,
      about: data.description,
      tier: data.tier || "Enterprise",
      website: data.website || "",
      verified: true,
      openRoles: 0,
      rating: 4.8,
      reviewsCount: 12,
      logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=0B5ED7&color=fff&size=128&bold=true`,
      createdAt: new Date().toISOString(),
    };

    dataStore.companies.unshift(newCompany);

    dataStore.auditLogs.unshift({
      id: `aud_${Date.now()}`,
      entity: "Company",
      entityId: newCompany.id,
      action: "CREATE",
      newValue: newCompany,
      userId,
      timestamp: new Date().toISOString(),
    });

    return newCompany;
  }
}
