import z from "zod";
import { errors, minimum } from "../../lib";

export const PlayInput = z.object({
  body: z.object({
    bet: z
      .number(errors("Bet", "Number"))
      .min(1, minimum("Bet"))
      .positive("Bet must be a positive number"),
  }),
});

export type PlayInput = z.infer<typeof PlayInput>["body"];
