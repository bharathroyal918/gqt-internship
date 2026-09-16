import { NextRequest } from "next/server";
import { PartnersController } from "@/src/modules/partners/partners.controller";

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return PartnersController.toggleVisibility(req, context);
}
