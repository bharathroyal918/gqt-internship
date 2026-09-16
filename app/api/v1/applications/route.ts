import { NextRequest } from "next/server";
import { ApplicationsController } from "@/src/modules/applications/applications.controller";

export async function GET(req: NextRequest) {
  return ApplicationsController.list(req);
}

export async function POST(req: NextRequest) {
  return ApplicationsController.apply(req);
}
