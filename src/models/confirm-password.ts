import z from "zod";

export const confirmPasswordSchema = z.object({
  password: z.string().min(1, "Senha obrigatória"),
});

export type ConfirmPasswordData = z.infer<typeof confirmPasswordSchema>;