import { NextRequest } from "next/server";
import { NewslettersController } from "@/src/modules/newsletters/newsletters.controller";

export async function POST(req: NextRequest) {
  return NewslettersController.subscribe(req);
}
