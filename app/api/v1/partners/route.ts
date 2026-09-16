import { NextRequest } from "next/server";
import { PartnersController } from "@/src/modules/partners/partners.controller";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("all") === "true") {
    return PartnersController.listAll(req);
  }
  return PartnersController.list(req);
}
