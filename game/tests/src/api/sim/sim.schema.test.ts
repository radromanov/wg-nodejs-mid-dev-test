import { SimInput } from "@api/sim";

describe("Sim Schema Validation", () => {
  describe("Valid Inputs", () => {
    it("should successfully parse a valid object with integer bet", () => {
      const valid = SimInput.safeParse({ body: { count: 5, bet: 100 } });
      expect(valid.success).toBe(true);
    });

    it("should successfully parse a valid object with decimal bet", () => {
      const valid = SimInput.safeParse({ body: { count: 5, bet: 100.5 } });
      expect(valid.success).toBe(true);
    });
  });

  describe("Invalid Inputs", () => {
    it("should fail to parse when count is missing", () => {
      const invalid = SimInput.safeParse({ body: { bet: "100" } });
      expect(invalid.success).toBe(false);
    });

    it("should fail to parse when count and bet are strings", () => {
      const invalid = SimInput.safeParse({
        body: { count: "5", bet: "100.5" },
      });
      expect(invalid.success).toBe(false);
    });

    it("should fail to parse when count is negative and bet is boolean", () => {
      const invalid = SimInput.safeParse({ body: { count: -5, bet: true } });
      expect(invalid.success).toBe(false);
    });

    it("should fail to parse when count is boolean and bet is string", () => {
      const invalid = SimInput.safeParse({
        body: { count: true, bet: "true" },
      });
      expect(invalid.success).toBe(false);
    });

    it("should fail to parse when count is string 'true' and bet is negative", () => {
      const invalid = SimInput.safeParse({ body: { count: "true", bet: -10 } });
      expect(invalid.success).toBe(false);
    });

    it("should fail to parse when count is correct but bet is a string", () => {
      const invalid = SimInput.safeParse({ body: { count: 5, bet: "-10" } });
      expect(invalid.success).toBe(false);
    });

    it("should fail to parse when count is a decimal", () => {
      const invalid = SimInput.safeParse({ body: { count: 5.5, bet: 100 } });
      expect(invalid.success).toBe(false);
    });
  });
});
