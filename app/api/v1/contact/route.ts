import { NextRequest } from "next/server";
import { ContactController } from "@/src/modules/contact/contact.controller";

export async function POST(req: NextRequest) {
  return ContactController.submit(req);
}

export async function GET(req: NextRequest) {
  return ContactController.list(req);
}
