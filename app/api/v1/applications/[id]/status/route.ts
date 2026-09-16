import { NextRequest } from "next/server";
import { ApplicationsController } from "@/src/modules/applications/applications.controller";

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return ApplicationsController.updateStatus(req, context);
}
