import { dataStore } from "@/src/shared/config/dataStore";

export class PartnersService {
  static async list() {
    return dataStore.partners.filter((p) => p.isVisible);
  }

  static async listAll() {
    return dataStore.partners;
  }

  static async updatePriority(id: string, priority: number) {
    const partner = dataStore.partners.find((p) => p.id === id);
    if (partner) {
      partner.priority = priority;
    }
    return partner;
  }

  static async toggleVisibility(id: string) {
    const partner = dataStore.partners.find((p) => p.id === id);
    if (partner) {
      partner.isVisible = !partner.isVisible;
    }
    return partner;
  }
}
