import { z } from "zod";

export const recoveryEmailSchema = z.object({
  email: z.string().email("E-mail inválido"),
});

export type RecoveryEmailData = z.infer<typeof recoveryEmailSchema>;
