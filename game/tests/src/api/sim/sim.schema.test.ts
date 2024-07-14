import { SimInput } from "@api/sim";

describe("Sim Schema Validation", () => {
  describe("Invalid Inputs", () => {
    const invalidInputs: { bet: any; count: any; description: string }[] = [
      { bet: "123", count: 3, description: "'bet' is a string" },
      { bet: -123, count: 3, description: "'bet' is a negative integer" },
      { bet: -123.5, count: 3, description: "'bet' is a negative decimal" },
      { bet: true, count: 3, description: "'bet' is a boolean" },
      { bet: {}, count: 3, description: "'bet' is an object" },
      { bet: undefined, count: 3, description: "'bet' is missing" },
      { bet: null, count: 3, description: "'bet' is missing" },
      { bet: 123, count: "3", description: "'count' is a string" },
      { bet: 123, count: -3, description: "'count' is a negative integer" },
      { bet: 123, count: -3.5, description: "'count' is a negative decimal" },
      { bet: 123, count: true, description: "'count' is a boolean" },
      { bet: 123, count: {}, description: "'count' is an object" },
      { bet: 123, count: undefined, description: "'count' is missing" },
      { bet: 123, count: null, description: "'count' is missing" },
    ];

    invalidInputs.forEach(({ bet, count, description }) =>
      it(`should fail to parse when ${description}`, () => {
        const invalid = SimInput.safeParse({ body: { bet, count } });
        expect(invalid.success).toBe(false);
      })
    );
  });

  describe("Valid Inputs", () => {
    const validInputs = [
      {
        bet: 123,
        count: 3,
        description: "'bet' and 'count' are positive integers",
      },
      {
        bet: 123.4,
        count: 3,
        description:
          "'bet' is a positive decimal and 'count' is a positive integer",
      },
    ];

    validInputs.forEach(({ bet, count, description }) => {
      it(`should successfully parse if ${description}`, () => {
        const valid = SimInput.safeParse({ body: { bet, count } });
        expect(valid.success).toBe(true);
      });
    });
  });
});
