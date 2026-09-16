import { NextRequest } from "next/server";
import { CertificatesController } from "@/src/modules/certificates/certificates.controller";

export async function GET(req: NextRequest, context: { params: Promise<{ code: string }> }) {
  return CertificatesController.verify(req, context);
}
