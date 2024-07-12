import request from "supertest";
import { app } from "@api/app";
import { ROUTES } from "@lib/constants";

describe(ROUTES.RTP, () => {
  const endpoints = app.endpoints();

  describe("Method Validation", () => {
    const invalidMethods = ["put", "patch", "delete"] as const;

    invalidMethods.forEach((method) => {
      it(`should respond with 405 for ${method.toUpperCase()} method`, async () =>
        await request(endpoints)[method](ROUTES.RTP).expect(405));
    });
  });

  describe("GET /", () => {
    it("should return the return-to-player percentage and respond with 200", async () => {
      const response = await request(endpoints).get(ROUTES.RTP);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("rtp");
      expect(typeof response.body.rtp).toBe("number");
    });
  });

  describe("POST /", () => {
    describe("Record bet", () => {
      describe("Invalid Inputs", () => {
        const invalidBets: { amount: any; type: any; description: string }[] = [
          {
            amount: 123,
            type: "bets",
            description: "'type' is not the string literal 'bet'",
          },
          {
            amount: -123,
            type: "bet",
            description: "'amount' is negative integer",
          },
          {
            amount: -123.4,
            type: "bet",
            description: "'amount' is negative decimal",
          },
          { amount: "123", type: "bet", description: "'amount' is a string" },
          { amount: true, type: "bet", description: "'amount' is a boolean" },
          { amount: {}, type: "bet", description: "'amount' is an object" },
        ];

        invalidBets.forEach(({ amount, type, description }) => {
          it(`should respond with 400 if ${description}`, async () => {
            await request(endpoints)
              .post(ROUTES.RTP)
              .send({ amount, type })
              .expect(400);
          });
        });
      });

      describe("Valid Inputs", () => {
        const validBets: { amount: any; type: any; description: string }[] = [
          {
            amount: 100,
            type: "bet",
            description:
              "'amount' is a positive integer and 'type' equals the string literal 'bet'",
          },
          {
            amount: 100.5,
            type: "bet",
            description:
              "'amount' is a positive decimal and 'type' equals the string literal 'bet'",
          },
        ];

        validBets.forEach(({ amount, type, description }) => {
          it(`should respond with 200 if ${description}`, async () => {
            await request(endpoints)
              .post(ROUTES.RTP)
              .send({ amount, type })
              .expect(200);
          });
        });
      });
    });

    describe("Record winning", () => {
      describe("Invalid Inputs", () => {
        const invalidWinnings: {
          amount: any;
          type: any;
          description: string;
        }[] = [
          {
            amount: 123,
            type: "winnings",
            description: "'type' is not the string literal 'winning'",
          },
          {
            amount: -123,
            type: "winning",
            description: "'amount' is a negative integer",
          },
          {
            amount: -123.4,
            type: "winning",
            description: "'amount' is a negative decimal",
          },
          {
            amount: "123",
            type: "winning",
            description: "'amount' is a string",
          },
          {
            amount: true,
            type: "winning",
            description: "'amount' is a boolean",
          },
          { amount: {}, type: "winning", description: "'amount' is an object" },
        ];

        invalidWinnings.forEach(({ amount, type, description }) => {
          it(`should respond with 400 if ${description}`, async () => {
            await request(endpoints)
              .post(ROUTES.RTP)
              .send({ amount, type })
              .expect(400);
          });
        });
      });

      describe("Valid Inputs", () => {
        const validWinnings: { amount: any; type: any; description: string }[] =
          [
            {
              amount: 100,
              type: "winning",
              description:
                "'amount' is a positive integer and 'type' equals the string literal 'winning'",
            },
            {
              amount: 100.5,
              type: "winning",
              description:
                "'amount' is a positive decimal and 'type' equals the string literal 'winning'",
            },
          ];

        validWinnings.forEach(({ amount, type, description }) => {
          it(`should respond with 200 if ${description}`, async () => {
            await request(endpoints)
              .post(ROUTES.RTP)
              .send({ amount, type })
              .expect(200);
          });
        });
      });
    });
  });

  describe("OPTIONS /", () => {
    it("should respond with 204 and allow POST and OPTIONS methods", async () => {
      const response = await request(endpoints).options(ROUTES.RTP).expect(204);

      const allowedMethods = response.headers["access-control-allow-methods"];
      expect(allowedMethods).toContain("GET");
      expect(allowedMethods).toContain("POST");
      expect(allowedMethods).toContain("OPTIONS");
    });
  });
});
