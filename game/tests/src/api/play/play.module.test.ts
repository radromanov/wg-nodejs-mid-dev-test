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

  describe("POST /", () => {
    const postPlay = async (payload: object) =>
      await request(endpoints).post(ROUTES.PLAY).send(payload);

    describe("Invalid Inputs", () => {
      const invalidBets: { bet: any; description: string }[] = [
        { bet: "123", description: "'bet' is a string" },
        { bet: -123, description: "'bet' is a negative integer" },
        { bet: -123.5, description: "'bet' is a negative decimal" },
        { bet: true, description: "'bet' is a boolean" },
        { bet: {}, description: "'bet' is an object" },
        { bet: undefined, description: "'bet' is missing" },
      ];

      invalidBets.forEach(({ bet, description }) => {
        it(`should respond with 400 if ${description}`, async () => {
          await request(endpoints).post(ROUTES.PLAY).send({ bet }).expect(400);
        });
      });
    });

    describe("Valid Inputs", () => {
      const validBets: { bet: any; description: string }[] = [
        { bet: 100, description: "'bet' is a positive integer" },
        { bet: 100.5, description: "'bet' is a positive decimal" },
      ];

      validBets.forEach(({ bet, description }) => {
        it(`should respond with 200 if ${description} and return matrix and winnings in the correct format`, async () => {
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
});
