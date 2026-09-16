import { NextRequest } from "next/server";
import { StudentsController } from "@/src/modules/students/students.controller";

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return StudentsController.toggleSave(req, context);
}
