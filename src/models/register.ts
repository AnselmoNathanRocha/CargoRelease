import { z } from "zod";
import { IPageable } from "./pagination";

export interface Register {
  id: string;
  date: string;
  productDescription: string;
  productCode: string;
  opNumber: number;
  batch: string;
  coa: boolean;
  viscosity: number | null;
  hydrogenPotential: number;
  density: number;
  active: number | null;
  hours: string;
  responsibleId: string;
  notes?: string;
}

export const registerSchema = z.object({
  date: z.string().nonempty({ message: "Campo obrigatório" }),
  productDescription: z.string().nonempty({ message: "Campo obrigatório" }),
  productCode: z.string().nonempty({ message: "Campo obrigatório" }),
  opNumber: z
    .number({ error: "Número de OP inválido" })
    .refine((val) => val.toString().length == 5, { message: "OP precisa ter 5 dígitos" }),
  batch: z.string().nonempty({ message: "Campo obrigatório" }),
  coa: z.boolean({ error: "Valor inválido" }),
  viscosity: z
    .number({ error: "Valor inválido" })
    .nullable()
    .optional(),
  hydrogenPotential: z.number({ error: "Valor inválido" }),
  density: z.number({ error: "Valor inválido" }),
  active: z
    .number({ error: "Valor inválido" })
    .nullable()
    .optional(),
  hours: z.string().nonempty({ message: "Campo obrigatório" }),
  responsibleId: z.string({ error: "Selecione um responsável" }).nonempty({ message: "Campo obrigatório" }),
  notes: z.string().optional(),
});

export type RegisterData = z.infer<typeof registerSchema>;

export interface RegisterFilter extends IPageable {
  term: string | null;
}