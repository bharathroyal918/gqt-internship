import { NextRequest } from "next/server";
import { SettingsController } from "@/src/modules/settings/settings.controller";

export async function GET(req: NextRequest) {
  return SettingsController.getSettings(req);
}

export async function PUT(req: NextRequest) {
  return SettingsController.updateSettings(req);
}
