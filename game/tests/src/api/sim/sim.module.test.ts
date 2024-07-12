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

  describe("Non-implemented Methods", () => {
    const methods = ["get", "put", "patch", "delete"] as const;
    methods.forEach((method) => {
      it(`should respond with 405 for ${method.toUpperCase()} method`, async () => {
        await request(endpoints)[method](ROUTES.SIM).expect(405);
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

  describe("POST /", () => {
    const sendPostRequest = (payload: object) =>
      request(endpoints).post(ROUTES.SIM).send(payload);

    it("should respond with 400 for invalid 'bet' property", async () => {
      await sendPostRequest({ bet: "100", count }).expect(400);
    });

    it("should respond with 400 for missing 'bet' property", async () => {
      await sendPostRequest({ count }).expect(400);
    });

    it("should respond with 400 for invalid 'count' property", async () => {
      await sendPostRequest({ bet, count: "3" }).expect(400);
    });

    it("should respond with 400 for missing 'count' property", async () => {
      await sendPostRequest({ bet }).expect(400);
    });

    it("should respond with 200 and the correct response body for valid request", async () => {
      const response = await sendPostRequest({ count, bet }).expect(200);
      expect(response.body).toHaveProperty("totalWinnings");
      expect(response.body).toHaveProperty("netResult");
    });
  });
});
