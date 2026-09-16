import { NextRequest } from "next/server";
import { CollegesController } from "@/src/modules/colleges/colleges.controller";

export async function GET(req: NextRequest) {
  return CollegesController.list(req);
}

export async function POST(req: NextRequest) {
  return CollegesController.create(req);
}
