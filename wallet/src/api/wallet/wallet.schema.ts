import z from "zod";
import { errors } from "@lib/zod";

export const WalletInput = z.object({
  body: z.object({
    amount: z
      .number(errors("Amount", "Number"))
      .positive("Amount must be a positive number"),
  }),
});

export type WalletInput = z.infer<typeof WalletInput>["body"];
