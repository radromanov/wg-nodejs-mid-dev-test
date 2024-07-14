import { PlayInput } from "@api/play";

describe("Play Schema Validation", () => {
  describe("Invalid Inputs", () => {
    const invalidInputs = [
      { bet: "100", description: "'bet' is a string" },
      { bet: true, description: "'bet' is a boolean" },
      { bet: -100, description: "'bet' is a negative integer" },
      { bet: -100.5, description: "'bet' is a negative decimal" },
      { bet: undefined, description: "'bet' is missing" },
      { bet: null, description: "'bet' is missing" },
      { bet: {}, description: "'bet' is an object" },
    ];

    invalidInputs.forEach(({ bet, description }) =>
      it(`should fail to parse when ${description}`, () => {
        const invalid = PlayInput.safeParse({ body: { bet } });
        expect(invalid.success).toBe(false);
      })
    );
  });

  describe("Valid Inputs", () => {
    const validInputs: { bet: any; description: string }[] = [
      { bet: 100, description: "'bet' is a positive integer" },
      { bet: 100.5, description: "'bet' is a positive decimal" },
    ];

    validInputs.forEach(({ bet, description }) => {
      it(`should successfully parse when ${description}`, () => {
        const valid = PlayInput.safeParse({ body: { bet } });
        expect(valid.success).toBe(true);
      });
    });
  });
});
