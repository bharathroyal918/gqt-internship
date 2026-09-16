import { NextRequest } from "next/server";
import { CompaniesController } from "@/src/modules/companies/companies.controller";

export async function GET(req: NextRequest) {
  return CompaniesController.list(req);
}

export async function POST(req: NextRequest) {
  return CompaniesController.create(req);
}
