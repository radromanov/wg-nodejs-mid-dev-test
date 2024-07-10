import z from "zod";
import { errors, minimum } from "@lib/zod";

export const WalletInput = z.object({
  body: z.object({
    amount: z
      .number(errors("Amount", "Number"))
      .min(1, minimum("Amount"))
      .positive("Amount must be a positive integer"),
  }),
});

export type WalletInput = z.infer<typeof WalletInput>["body"];
