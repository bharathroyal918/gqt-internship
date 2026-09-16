import { NextRequest } from "next/server";
import { StudentsController } from "@/src/modules/students/students.controller";

export async function GET(req: NextRequest) {
  return StudentsController.getSaved(req);
}
