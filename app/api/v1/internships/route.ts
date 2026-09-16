import { NextRequest } from "next/server";
import { InternshipsController } from "@/src/modules/internships/internships.controller";

export async function GET(req: NextRequest) {
  return InternshipsController.list(req);
}

export async function POST(req: NextRequest) {
  return InternshipsController.create(req);
}
