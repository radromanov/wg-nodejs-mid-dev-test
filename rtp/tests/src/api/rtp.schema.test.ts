import { RecordInput } from "@api/rtp/rtp.schema";

describe("RTP Schema Validation", () => {
  describe("Invalid Inputs", () => {
    const invalidInputs: { amount: any; type: any; description: string }[] = [
      { amount: "123", type: "bet", description: "'amount' is a string" },
      {
        amount: -123,
        type: "winning",
        description: "'amount' is a negative integer",
      },
      {
        amount: -123.5,
        type: "bet",
        description: "'amount' is a negative decimal",
      },
      { amount: true, type: "winning", description: "'amount' is a boolean" },
      { amount: {}, type: "bet", description: "'amount' is an object" },
      {
        amount: undefined,
        type: "winning",
        description: "'amount' is missing",
      },
      { amount: 123, type: 1, description: "'type' is an integer" },
      { amount: 123, type: -1, description: "'type' is a negative integer" },
      { amount: 123, type: 3.5, description: "'type' is a positive decimal" },
      { amount: 123, type: -3.5, description: "'type' is a negative decimal" },
      { amount: 123, type: true, description: "'type' is a boolean" },
      { amount: 123, type: {}, description: "'type' is an object" },
      { amount: 123, type: undefined, description: "'type' is missing" },
      {
        amount: 123,
        type: "some type",
        description: "'type' is not the string literals 'bet' or 'winning'",
      },
    ];

    invalidInputs.forEach(({ amount, type, description }) => {
      it(`should fail to parse if ${description}`, () => {
        const invalid = RecordInput.safeParse({ body: { amount, type } });
        expect(invalid.success).toBe(false);
      });
    });
  });

  describe("Valid Inputs", () => {
    const validInputs: { amount: any; type: any; description: string }[] = [
      {
        amount: 123,
        type: "bet",
        description:
          "'amount' is a positive integer and 'type' is the string literal 'bet'",
      },
      {
        amount: 123.5,
        type: "bet",
        description:
          "'amount' is a positive decimal and 'type' is the string literal 'bet'",
      },
      {
        amount: 123,
        type: "winning",
        description:
          "'amount' is a positive integer and 'type' is the string literal 'winning'",
      },
      {
        amount: 123.5,
        type: "winning",
        description:
          "'amount' is a positive decimal and 'type' is the string literal 'winning'",
      },
    ];

    validInputs.forEach(({ amount, type, description }) => {
      it(`should successfully parse if ${description}`, () => {
        const valid = RecordInput.safeParse({ body: { amount, type } });
        expect(valid.success).toBe(true);
      });
    });
  });
});
