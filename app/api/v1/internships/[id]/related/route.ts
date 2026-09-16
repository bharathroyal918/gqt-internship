import { NextRequest } from "next/server";
import { InternshipsController } from "@/src/modules/internships/internships.controller";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return InternshipsController.getRelated(req, context);
}
