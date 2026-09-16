import { NextRequest } from "next/server";
import { ApplicationsController } from "@/src/modules/applications/applications.controller";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return ApplicationsController.getById(req, context);
}
