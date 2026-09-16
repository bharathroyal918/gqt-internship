import { NextRequest } from "next/server";
import { CareerLaunchController } from "@/src/modules/career-launch/careerLaunch.controller";

export async function GET(req: NextRequest) {
  return CareerLaunchController.list(req);
}

export async function POST(req: NextRequest) {
  return CareerLaunchController.enroll(req);
}
