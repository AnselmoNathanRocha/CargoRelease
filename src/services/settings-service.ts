import { PasswordLastUpdatedAt } from "@/models/password-last-updated-at";
import { RecoveryEmailData } from "@/models/recovery-email";
import { httpClient } from "./http-client";

const getPasswordLastUpdatedAt = () =>
  httpClient.get<PasswordLastUpdatedAt>("/settings/password-last-updated-at");

const updateRecoveryEmail = (data: RecoveryEmailData) =>
  httpClient.put("/settings/recovery-email", data);

export const settingsService = {
  getPasswordLastUpdatedAt,
  updateRecoveryEmail,
};
