import { NextRequest } from "next/server";
import { CircularsController } from "@/src/modules/circulars/circulars.controller";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return CircularsController.getById(req, context);
}
