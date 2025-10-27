import { Settings } from "@/models/settings";
import { RecoveryEmailData } from "@/models/recovery-email";
import { httpClient } from "./http-client";

class SettingsService {
  async getSettings(): Promise<Settings> {
    const { data } = await httpClient.get("/settings");
    return data;
  }

  async updateRecoveryEmail (data: RecoveryEmailData) {
    await httpClient.put("/settings/recovery-email", data);
  }
}

export const settingsService = new SettingsService();