import request from "supertest";
import { app } from "@api/app";
import { WalletService } from "@api/wallet";
import { walletApi } from "@lib/axios";
import { ROUTES } from "@lib/constants";

describe(ROUTES.SIM, () => {
  const endpoints = app.endpoints();

  it("should return a 405 for non-implemented methods", async () => {
    await request(endpoints).get(ROUTES.SIM).expect(405);
    await request(endpoints).put(ROUTES.SIM).expect(405);
    await request(endpoints).patch(ROUTES.SIM).expect(405);
    await request(endpoints).delete(ROUTES.SIM).expect(405);
  });

  describe("OPTIONS /", () => {
    it("should return a 204", async () => {
      const response = await request(endpoints).options(ROUTES.SIM);
      expect(response.status).toBe(204);
    });

    it("should allow POST and OPTIONS methods", async () => {
      const response = await request(endpoints).options(ROUTES.SIM);
      const allowedMethods = response.headers["access-control-allow-methods"];

      expect(allowedMethods).toContain("POST");
      expect(allowedMethods).toContain("OPTIONS");
    });
  });

  describe("POST /", () => {
    const bet = 100;
    const count = 3;

    let walletService: WalletService;

    beforeAll(() => {
      walletService = new WalletService(walletApi);
    });

    beforeEach(async () => {
      await walletService.deposit(bet * count);
    });

    it("should return a 400 if invalid 'bet' property", async () => {
      await request(endpoints)
        .post(ROUTES.SIM)
        .send({ bet: "100", count })
        .expect(400);
    });

    it("should return a 400 if missing 'bet' property", async () => {
      await request(endpoints).post(ROUTES.SIM).send({ count }).expect(400);
    });

    it("should throw a 400 if invalid 'count' property", async () => {
      await request(endpoints)
        .post(ROUTES.SIM)
        .send({ bet, count: "3" })
        .expect(400);
    });

    it("should return a 400 if missing 'count' property", async () => {
      await request(endpoints).post(ROUTES.SIM).send({ bet }).expect(400);
    });

    it("should return 200 and the correct response body", async () => {
      const response = await request(endpoints)
        .post(ROUTES.SIM)
        .send({ count, bet })
        .expect(200);

      expect(response.body).toHaveProperty("totalWinnings");
      expect(response.body).toHaveProperty("netResult");
    });
  });
});
