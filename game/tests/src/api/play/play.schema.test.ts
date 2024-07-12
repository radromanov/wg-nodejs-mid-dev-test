import { PlayInput } from "@api/play";

describe("Play Schema Validation", () => {
  describe("Valid Inputs", () => {
    it("should successfully parse a valid object with integer bet", () => {
      const valid = PlayInput.safeParse({ body: { bet: 100 } });
      expect(valid.success).toBe(true);
    });

    it("should successfully parse a valid object with decimal bet", () => {
      const valid = PlayInput.safeParse({ body: { bet: 100.5 } });
      expect(valid.success).toBe(true);
    });
  });

  describe("Invalid Inputs", () => {
    const invalidInputs = [
      { bet: "100", description: "a string representing an integer" },
      { bet: "100.5", description: "a string representing a decimal" },
      { bet: true, description: "a boolean" },
      { bet: "true", description: "a string 'boolean'" },
      { bet: -100, description: "negative" },
      { bet: "-100", description: "a negative string" },
    ];

    invalidInputs.forEach(({ bet, description }) =>
      it(`should fail to parse when bet is ${description}`, () => {
        const invalid = PlayInput.safeParse({ body: { bet } });
        expect(invalid.success).toBe(false);
      })
    );
  });
});
