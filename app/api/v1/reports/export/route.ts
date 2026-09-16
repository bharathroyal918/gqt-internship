import { NextRequest } from "next/server";
import { ReportsController } from "@/src/modules/reports/reports.controller";

export async function GET(req: NextRequest) {
  return ReportsController.exportReport(req);
}
