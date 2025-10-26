import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "A senha atual deve ter no mínimo 8 caracteres"),
    newPassword: z
      .string()
      .min(8, "A nova senha deve ter no mínimo 8 caracteres"),
    confirmNewPassword: z
      .string()
      .min(8, "A confirmação de senha deve ter no mínimo 8 caracteres"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "A nova senha e a confirmação não conferem",
  });

export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
