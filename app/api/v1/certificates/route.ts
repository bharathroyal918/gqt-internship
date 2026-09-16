import { NextRequest } from "next/server";
import { CertificatesController } from "@/src/modules/certificates/certificates.controller";

export async function GET(req: NextRequest) {
  return CertificatesController.list(req);
}

export async function POST(req: NextRequest) {
  return CertificatesController.issue(req);
}
