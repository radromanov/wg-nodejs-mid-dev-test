import { SimInput } from "@api/sim";

describe("Sim Schema", () => {
  it("should return a successfully parsed object", () => {
    const valid1 = SimInput.safeParse({ body: { count: 5, bet: 100 } });
    const valid2 = SimInput.safeParse({ body: { count: 5, bet: 100.5 } });

    expect(valid1.success).toBe(true);
    expect(valid2.success).toBe(true);
  });

  it("should return an unsuccessfully parsed object", () => {
    const invalid1 = SimInput.safeParse({ body: { bet: "100" } });
    const invalid2 = SimInput.safeParse({ body: { count: "5", bet: "100.5" } });
    const invalid3 = SimInput.safeParse({ body: { count: -5, bet: true } });
    const invalid4 = SimInput.safeParse({ body: { count: true, bet: "true" } });
    const invalid5 = SimInput.safeParse({ body: { count: "true", bet: -10 } });
    const invalid6 = SimInput.safeParse({ body: { count: 5, bet: "-10" } });
    const invalid7 = SimInput.safeParse({ body: { count: 5.5, bet: 100 } });

    expect(invalid1.success).toBe(false);
    expect(invalid2.success).toBe(false);
    expect(invalid3.success).toBe(false);
    expect(invalid4.success).toBe(false);
    expect(invalid5.success).toBe(false);
    expect(invalid6.success).toBe(false);
    expect(invalid7.success).toBe(false);
  });
});
