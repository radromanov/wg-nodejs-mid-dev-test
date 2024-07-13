import { WalletInput } from "@api/wallet";

describe("Wallet Schema Validation", () => {
  describe("Invalid Inputs", () => {
    const invalidInputs: { amount: any; description: string }[] = [
      { amount: "100", description: "'amount' is a string" },
      { amount: true, description: "'amount' is a boolean" },
      { amount: -100, description: "'amount' is a negative integer" },
      { amount: -100.3, description: "'amount' is a negative decimal" },
      { amount: {}, description: "'amount' is an object" },
      { amount: undefined, description: "'amount' is missing" },
      { amount: null, description: "'amount' is missing" },
    ];

    invalidInputs.forEach(({ amount, description }) =>
      it(`should fail to parse if ${description}`, () => {
        const invalid = WalletInput.safeParse({ body: { amount } });
        expect(invalid.success).toBe(false);
      })
    );
  });

  describe("Valid Inputs", () => {
    const validInputs: { amount: any; description: string }[] = [
      { amount: 100, description: "'amount' is a positive integer" },
      { amount: 100.3, description: "'amount' is a positive decimal" },
    ];

    validInputs.forEach(({ amount, description }) =>
      it(`should successfully parse if ${description}`, () => {
        const valid = WalletInput.safeParse({ body: { amount } });
        expect(valid.success).toBe(true);
      })
    );
  });
});
