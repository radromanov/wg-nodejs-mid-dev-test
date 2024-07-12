import request from "supertest";
import { app } from "@api/app";
import { WalletService } from "@api/wallet";
import { walletApi } from "@lib/axios";
import { ROUTES } from "@lib/constants";

describe(ROUTES.SIM, () => {
  const endpoints = app.endpoints();

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
