import request from "supertest";
import { app } from "@api/app";
import { ROUTES, SLOT_COLS, SLOT_ROWS } from "@lib/constants";

describe(ROUTES.PLAY, () => {
  const endpoints = app.endpoints();

  describe("Method Validation", () => {
    const invalidMethods = ["get", "put", "patch", "delete"] as const;

    invalidMethods.forEach((method) => {
      it(`should respond with 405 for ${method.toUpperCase()} method`, async () => {
        await request(endpoints)[method](ROUTES.PLAY).expect(405);
      });
    });
  });

  describe("OPTIONS /", () => {
    it("should respond with 204 and allow POST and OPTIONS methods", async () => {
      const response = await request(endpoints).options(ROUTES.PLAY);
      expect(response.status).toBe(204);

      const allowedMethods = response.headers["access-control-allow-methods"];
      expect(allowedMethods).toContain("POST");
      expect(allowedMethods).toContain("OPTIONS");
    });
  });

  describe("POST /", () => {
    const bet = 100;

    // Helper function to avoid repetition
    const postPlay = async (payload: object) => {
      return await request(endpoints).post(ROUTES.PLAY).send(payload);
    };

    it("should respond with 400 if 'bet' is invalid", async () => {
      const response = await postPlay({ bet: "123" });
      expect(response.status).toBe(400);
    });

    it("should respond with 400 if 'bet' is missing", async () => {
      const response = await postPlay({});
      expect(response.status).toBe(400);
    });

    it("should respond with 200 and the correct response body for valid 'bet'", async () => {
      const response = await postPlay({ bet });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("winnings");
      expect(typeof response.body.winnings).toBe("number");

      expect(response.body).toHaveProperty("matrix");
      expect(Array.isArray(response.body.matrix)).toBe(true);

      expect(response.body.matrix.length).toBe(SLOT_COLS);
      response.body.matrix.forEach((row: string[]) =>
        expect(row.length).toBe(SLOT_ROWS)
      );
    });
  });
});
