import { dataStore } from "@/src/shared/config/dataStore";

export class CircularsService {
  static async list(params?: { category?: string; search?: string }) {
    let list = [...dataStore.circulars];

    if (params?.category && params.category !== "All") {
      list = list.filter((c) => c.category?.toLowerCase() === params.category?.toLowerCase());
    }

    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (c) =>
          c.title?.toLowerCase().includes(q) ||
          c.refNo?.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q)
      );
    }

    // Pinned circulars first
    list.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

    return list;
  }

  static async getById(id: string) {
    const circular = dataStore.circulars.find((c) => c.id === id);
    if (!circular) {
      throw { statusCode: 404, message: "Circular directive not found" };
    }
    return circular;
  }

  static async create(data: any, userId?: string) {
    const newCircular = {
      id: `circ-${dataStore.circulars.length + 1}`,
      refNo: data.circularNumber || `VTU/ACA/2026/${Math.floor(100 + Math.random() * 900)}`,
      title: data.title,
      category: data.category || "Latest",
      date: new Date().toISOString().split("T")[0],
      department: data.department || "VTU Belagavi Academic Council",
      description: data.description,
      pinned: data.isPinned || false,
      isNew: true,
      fileSize: "1.4 MB",
      downloadUrl: data.attachmentUrl || "/circulars/sample.pdf",
    };

    dataStore.circulars.unshift(newCircular);

    dataStore.auditLogs.unshift({
      id: `aud_${Date.now()}`,
      entity: "Circular",
      entityId: newCircular.id,
      action: "CREATE",
      newValue: newCircular,
      userId,
      timestamp: new Date().toISOString(),
    });

    return newCircular;
  }
}
