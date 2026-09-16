import { dataStore } from "@/src/shared/config/dataStore";

export class CSRService {
  static async list() {
    return dataStore.csrDrives;
  }

  static async create(data: {
    driveName: string;
    collegeId: string;
    coordinatorName: string;
    startDate: string;
    endDate?: string;
  }) {
    const college = dataStore.colleges.find((c) => c.id === data.collegeId);
    const newDrive = {
      id: `csr_${Date.now()}`,
      driveName: data.driveName,
      collegeName: college?.name || "VTU Affiliated College",
      collegeId: data.collegeId,
      coordinatorName: data.coordinatorName,
      status: "ONGOING",
      startDate: data.startDate,
      endDate: data.endDate || null,
      batchCode: `CSR-GQT-2026-B${dataStore.csrDrives.length + 1}`,
      groupLink: "https://chat.whatsapp.com/mock-csr-group",
      whatsAppGroupId: `wa_grp_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    dataStore.csrDrives.unshift(newDrive);
    return newDrive;
  }
}
