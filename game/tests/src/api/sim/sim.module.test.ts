import request from "supertest";
import { app } from "@api/app";
import { WalletService } from "@api/wallet";
import { walletApi } from "@lib/axios";
import { ROUTES } from "@lib/constants";

describe(ROUTES.SIM, () => {
  const endpoints = app.endpoints();
  const bet = 100;
  const count = 3;

  let walletService: WalletService;

  beforeAll(() => {
    walletService = new WalletService(walletApi);
  });

  beforeEach(async () => {
    await walletService.deposit(bet * count);
  });

  describe("Method Validation", () => {
    const methods = ["get", "put", "patch", "delete"] as const;
    methods.forEach((method) => {
      it(`should respond with 405 for ${method.toUpperCase()} method`, async () => {
        await request(endpoints)[method](ROUTES.SIM).expect(405);
      });
    });
  });

  describe("POST /", () => {
    const sendPostRequest = (payload: object) =>
      request(endpoints).post(ROUTES.SIM).send(payload);

    describe("Invalid Inputs", () => {
      const invalidInputs: { bet: any; count: any; description: string }[] = [
        { bet: "123", count: 3, description: "'bet' is a string" },
        { bet: -123, count: 3, description: "'bet' is a negative integer" },
        { bet: -123.5, count: 3, description: "'bet' is a negative decimal" },
        { bet: true, count: 3, description: "'bet' is a boolean" },
        { bet: {}, count: 3, description: "'bet' is an object" },
        { bet: undefined, count: 3, description: "'bet' is missing" },
        { bet: 123, count: "3", description: "'count' is a string" },
        { bet: 123, count: -3, description: "'count' is a negative integer" },
        { bet: 123, count: -3.5, description: "'count' is a negative decimal" },
        { bet: 123, count: true, description: "'count' is a boolean" },
        { bet: 123, count: {}, description: "'count' is an object" },
        { bet: 123, count: undefined, description: "'count' is missing" },
      ];

      invalidInputs.forEach(({ bet, description }) => {
        it(`should respond with 400 if ${description}`, async () => {
          await request(endpoints).post(ROUTES.SIM).send({ bet }).expect(400);
        });
      });
    });

    describe("Valid Inputs", () => {
      const validInputs: { bet: any; count: any; description: string }[] = [
        {
          bet: 100,
          count: 3,
          description: "'bet' and 'count' are positive integers'",
        },
        {
          bet: 100.5,
          count: 3,
          description:
            "'bet' is a positive decimal and 'count' is a positive integer'",
        },
      ];

      validInputs.forEach(({ bet, count, description }) => {
        it(`should respond with 200 if ${description} and return the correct response body`, async () => {
          const response = await sendPostRequest({ count, bet }).expect(200);
          expect(response.body).toHaveProperty("totalWinnings");
          expect(response.body).toHaveProperty("netResult");
        });
      });
    });
  });

  describe("OPTIONS /", () => {
    it("should respond with 204 for OPTIONS method", async () => {
      await request(endpoints).options(ROUTES.SIM).expect(204);
    });
    it("should allow POST and OPTIONS methods", async () => {
      const response = await request(endpoints).options(ROUTES.SIM);
      const allowedMethods = response.headers["access-control-allow-methods"];
      expect(allowedMethods).toContain("POST");
      expect(allowedMethods).toContain("OPTIONS");
    });
  });
});
