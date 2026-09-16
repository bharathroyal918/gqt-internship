import { NextRequest } from "next/server";
import { CircularsController } from "@/src/modules/circulars/circulars.controller";

export async function GET(req: NextRequest) {
  return CircularsController.list(req);
}

export async function POST(req: NextRequest) {
  return CircularsController.create(req);
}
