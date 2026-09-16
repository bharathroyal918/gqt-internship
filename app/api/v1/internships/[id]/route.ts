import { NextRequest } from "next/server";
import { InternshipsController } from "@/src/modules/internships/internships.controller";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return InternshipsController.getById(req, context);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return InternshipsController.update(req, context);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return InternshipsController.delete(req, context);
}
