import { NextRequest } from "next/server";
import { ApplicationsController } from "@/src/modules/applications/applications.controller";

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return ApplicationsController.scheduleInterview(req, context);
}
