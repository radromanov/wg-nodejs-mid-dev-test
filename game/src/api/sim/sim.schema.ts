import z from "zod";
import { errors, minimum } from "../../lib";

export const SimInput = z.object({
  body: z.object({
    count: z
      .number(errors("Count", "Number"))
      .min(1, minimum("Count"))
      .positive("Count must be a positive number"),
    bet: z
      .number(errors("Bet", "Number"))
      .min(1, minimum("Bet"))
      .positive("Bet must be a positive number"),
  }),
});

export type SimInput = z.infer<typeof SimInput>["body"];
