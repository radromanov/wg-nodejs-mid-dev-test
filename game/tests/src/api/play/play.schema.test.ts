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
    it("should fail to parse when bet is a string representing an integer", () => {
      const invalid = PlayInput.safeParse({ body: { bet: "100" } });
      expect(invalid.success).toBe(false);
    });

    it("should fail to parse when bet is a string representing a decimal", () => {
      const invalid = PlayInput.safeParse({ body: { bet: "100.5" } });
      expect(invalid.success).toBe(false);
    });

    it("should fail to parse when bet is a boolean", () => {
      const invalid = PlayInput.safeParse({ body: { bet: true } });
      expect(invalid.success).toBe(false);
    });

    it("should fail to parse when bet is a string 'true'", () => {
      const invalid = PlayInput.safeParse({ body: { bet: "true" } });
      expect(invalid.success).toBe(false);
    });

    it("should fail to parse when bet is negative", () => {
      const invalid = PlayInput.safeParse({ body: { bet: -10 } });
      expect(invalid.success).toBe(false);
    });

    it("should fail to parse when bet is a negative string", () => {
      const invalid = PlayInput.safeParse({ body: { bet: "-10" } });
      expect(invalid.success).toBe(false);
    });
  });
});
