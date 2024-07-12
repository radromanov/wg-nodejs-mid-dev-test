import z from "zod";
import { errors } from "@lib/zod";

export const SimInput = z.object({
  body: z.object({
    count: z
      .number(errors("Count", "Number"))
      .positive("Count must be a positive integer")
      .int("Count must be a positive integer"),
    bet: z
      .number(errors("Bet", "Number"))
      .positive("Bet must be a positive number"),
  }),
});

export type SimInput = z.infer<typeof SimInput>["body"];
