import { NextRequest } from "next/server";
import { CompaniesController } from "@/src/modules/companies/companies.controller";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return CompaniesController.getById(req, context);
}
