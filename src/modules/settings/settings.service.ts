import { dataStore } from "@/src/shared/config/dataStore";

export class SettingsService {
  static async getSettings() {
    return dataStore.systemSettings;
  }

  static async updateSettings(data: Record<string, string>, userId?: string) {
    Object.assign(dataStore.systemSettings, data);

    dataStore.auditLogs.unshift({
      id: `aud_${Date.now()}`,
      entity: "SystemSettings",
      entityId: "global_settings",
      action: "UPDATE",
      newValue: data,
      userId,
      timestamp: new Date().toISOString(),
    });

    return dataStore.systemSettings;
  }
}
