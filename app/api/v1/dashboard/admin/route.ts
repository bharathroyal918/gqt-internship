import { NextRequest } from "next/server";
import { DashboardController } from "@/src/modules/dashboard/dashboard.controller";

export async function GET(req: NextRequest) {
  return DashboardController.getAdminDashboard(req);
}
