import { z } from "zod";

export interface AuthRequest {
  email: string;
  password: string;
}

export const loginSchema = z.object({
  email: z.string().email("Email inválido").nonempty("Campo obrigatório"),
  password: z
    .string()
    .min(6, "Mínimo 6 caracteres")
    .nonempty("Campo obrigatório"),
});

export type LoginData = z.infer<typeof loginSchema>;