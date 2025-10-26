import { z } from "zod";

export interface Responsible {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export const createResponsibleSchema = z.object({
  name: z
    .string({ error: "Digite um nome válido" })
    .trim()
    .nonempty("Campo obrigatório"),
});

export type CreateResponsibleData = z.infer<typeof createResponsibleSchema>;

export interface ResponsibleFilter {
  name?: string | null;
}