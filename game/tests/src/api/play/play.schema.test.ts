import { PlayInput } from "@api/play";

describe("Play Schema", () => {
  it("should return a successfully parsed object", () => {
    const valid1 = PlayInput.safeParse({ body: { bet: 100 } });
    const valid2 = PlayInput.safeParse({ body: { bet: 100.5 } });

    expect(valid1.success).toBe(true);
    expect(valid2.success).toBe(true);
  });

  it("should return an unsuccessfully parsed object", () => {
    const invalid1 = PlayInput.safeParse({ body: { bet: "100" } });
    const invalid2 = PlayInput.safeParse({ body: { bet: "100.5" } });
    const invalid3 = PlayInput.safeParse({ body: { bet: true } });
    const invalid4 = PlayInput.safeParse({ body: { bet: "true" } });
    const invalid5 = PlayInput.safeParse({ body: { bet: -10 } });
    const invalid6 = PlayInput.safeParse({ body: { bet: "-10" } });

    expect(invalid1.success).toBe(false);
    expect(invalid2.success).toBe(false);
    expect(invalid3.success).toBe(false);
    expect(invalid4.success).toBe(false);
    expect(invalid5.success).toBe(false);
    expect(invalid6.success).toBe(false);
  });
});
