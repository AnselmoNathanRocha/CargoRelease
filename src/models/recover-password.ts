import { z } from "zod";

export const recoverPasswordSchema = z
  .object({
    securityCode: z
      .string()
      .min(6, "Código inválido"),
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

export type RecoverPasswordData = z.infer<typeof recoverPasswordSchema>;
