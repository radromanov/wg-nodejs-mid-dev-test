import { WalletInput } from "@api/wallet";

describe("Wallet Schema Validation", () => {
  describe("Valid Inputs", () => {
    it("should successfully parse a valid object with a positive integer amount", () => {
      const valid = WalletInput.safeParse({ body: { amount: 100 } });
      expect(valid.success).toBe(true);
    });

    it("should successfully parse a valid object with a positive decimal amount", () => {
      const valid = WalletInput.safeParse({ body: { amount: 100.5 } });
      expect(valid.success).toBe(true);
    });
  });

  describe("Invalid Inputs", () => {
    const invalidInputs: { amount: any; description: string }[] = [
      { amount: "100", description: "a string representing an integer" },
      { amount: "100.5", description: "a string representing a decimal" },
      { amount: true, description: "a boolean" },
      { amount: "true", description: "a string 'boolean'" },
      { amount: -100, description: "negative" },
      { amount: "-100", description: "a negative string" },
    ];

    invalidInputs.forEach(({ amount, description }) =>
      it(`should fail to parse when bet is ${description}`, () => {
        const invalid = WalletInput.safeParse({ body: { amount } });
        expect(invalid.success).toBe(false);
      })
    );
  });
});
