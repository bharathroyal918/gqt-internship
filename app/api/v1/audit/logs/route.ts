import { NextRequest } from "next/server";
import { AuditController } from "@/src/modules/audit/audit.controller";

export async function GET(req: NextRequest) {
  return AuditController.list(req);
}
