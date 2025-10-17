import dayjs from "dayjs";
import { z } from "zod";

export const zodDateSchema = (outputFormat: string) =>
  z.coerce
    .string()
    .optional()
    .nullable()
    .transform((date) => date && dayjs.utc(date).format(outputFormat));

export const dateRangeSchema = z
  .object({
    from: zodDateSchema("YYYY-MM-DD"),
    to: zodDateSchema("YYYY-MM-DD"),
  })
  .default({ from: null, to: null });

export type DateRangeType = z.infer<typeof dateRangeSchema>;