import { NextRequest } from "next/server";
import { CSRController } from "@/src/modules/csr/csr.controller";

export async function GET(req: NextRequest) {
  return CSRController.list(req);
}

export async function POST(req: NextRequest) {
  return CSRController.create(req);
}
