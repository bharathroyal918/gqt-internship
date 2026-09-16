import { NextRequest } from "next/server";
import { StudentsController } from "@/src/modules/students/students.controller";

export async function GET(req: NextRequest) {
  return StudentsController.getMe(req);
}

export async function PUT(req: NextRequest) {
  return StudentsController.updateMe(req);
}
