import { ChangePasswordData } from "@/models/change-password";
import { RecoverPasswordData } from "@/models/recover-password";
import { httpClient } from "./http-client";

interface ValidateAdminPasswordPayload {
  password: string;
}

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

interface RecoverPasswordPayload {
  securityCode: string;
  newPassword: string;
}

class AuthService {
  async validateAdminPassword(password: string): Promise<boolean> {
    const { data } = await httpClient.post<{ isValid: boolean }>(
      "/auth/validate-admin-password",
      { password } as ValidateAdminPasswordPayload
    );
    return data.isValid;
  }

  async changePassword(payload: ChangePasswordData): Promise<void> {
    await httpClient.put("/auth/change-password", {
      currentPassword: payload.currentPassword,
      newPassword: payload.newPassword,
    } as ChangePasswordPayload);
  }

  async recoverPassword(payload: RecoverPasswordData): Promise<void> {
    await httpClient.post("/auth/recover-password", {
      securityCode: payload.securityCode,
      newPassword: payload.newPassword,
    } as RecoverPasswordPayload);
  }
}

export const authService = new AuthService();
