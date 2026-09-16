import { NextRequest } from "next/server";
import { SearchController } from "@/src/modules/search/search.controller";

export async function GET(req: NextRequest) {
  return SearchController.search(req);
}
