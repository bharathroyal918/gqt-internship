import { dataStore } from "@/src/shared/config/dataStore";

export class AuditService {
  static async list(params: {
    page: number;
    limit: number;
    skip: number;
    entity?: string;
    action?: string;
  }) {
    let list = [...dataStore.auditLogs];

    if (params.entity) {
      list = list.filter((l) => l.entity?.toLowerCase() === params.entity?.toLowerCase());
    }

    if (params.action) {
      list = list.filter((l) => l.action?.toLowerCase() === params.action?.toLowerCase());
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
}
