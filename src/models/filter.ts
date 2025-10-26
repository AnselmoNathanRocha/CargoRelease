import { z } from "zod";

export interface Filter {
  term?: string;
}

export const filterSchema = z.object({
  term: z.string().optional(),
});

export type FilterData = z.infer<typeof filterSchema>;