import z from "zod";
import { errors } from "@shared/lib/zod";

export const PlayInput = z.object({
  body: z.object({
    bet: z
      .number(errors("Bet", "Number"))
      .positive("Bet must be a positive number"),
  }),
});

export type PlayInput = z.infer<typeof PlayInput>["body"];
