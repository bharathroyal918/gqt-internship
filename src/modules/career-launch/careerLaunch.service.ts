import { dataStore } from "@/src/shared/config/dataStore";

export class CareerLaunchService {
  static async list() {
    return dataStore.careerLaunches;
  }

  static async enroll(data: {
    studentName: string;
    usn: string;
    courseName: string;
    paymentPlan: string;
    counselorName?: string;
    totalFee: number;
    amountPaid: number;
  }) {
    const remainingFee = data.totalFee - data.amountPaid;
    const newRecord = {
      id: `cl_${Date.now()}`,
      studentName: data.studentName,
      usn: data.usn,
      courseName: data.courseName,
      paymentPlan: data.paymentPlan || "INSTALLMENTS",
      admissionStatus: "ENROLLED",
      batchCode: `CL-2026-B${dataStore.careerLaunches.length + 1}`,
      counselorName: data.counselorName || "Direct Online Admission",
      totalFee: data.totalFee,
      amountPaid: data.amountPaid,
      remainingFee,
      paymentStatus: remainingFee <= 0 ? "PAID" : "PARTIAL",
      createdAt: new Date().toISOString(),
    };

    dataStore.careerLaunches.unshift(newRecord);
    return newRecord;
  }
}
