import { NextRequest } from "next/server";
import { StudentsController } from "@/src/modules/students/students.controller";

export async function POST(req: NextRequest) {
  return StudentsController.uploadResume(req);
}
