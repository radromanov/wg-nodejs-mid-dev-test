import { errors } from "@lib/zod";
import z from "zod";

export const RecordInput = z.object({
  body: z.object({
    amount: z
      .number(errors("Amount", "Number"))
      .positive("Amount must be a positive number"),
    type: z.enum(
      ["bet", "winning"],
      errors("Type", ["bet", "winning"].join(" | "))
    ),
  }),
});

export type RecordInput = z.infer<typeof RecordInput>["body"];
