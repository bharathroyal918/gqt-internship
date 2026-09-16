import { NextRequest } from "next/server";
import { CollegesController } from "@/src/modules/colleges/colleges.controller";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return CollegesController.getById(req, context);
}
