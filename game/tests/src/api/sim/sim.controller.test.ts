import request from "supertest";
import { app } from "@api/app";
import { WalletService } from "@api/wallet";
import { walletApi } from "@lib/axios";

describe("/sim", () => {
  const bet = 100;
  const count = 3;
  const endpoints = app.endpoints();

  describe("POST /", () => {
    let walletService: WalletService;

    beforeAll(() => {
      walletService = new WalletService(walletApi);
    });

    beforeEach(async () => {
      await walletService.deposit(bet * count);
    });

    it("should throw a 400", async () => {
      const response = await request(endpoints)
        .post("/sim")
        .send({ be: "some value" });

      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("stack");
      expect(response.body).toHaveProperty("message");

      expect(response.body.status).toBe(400);
      expect(response.body.message.length).toBeTruthy();
    });

    it("should return the correct response body", async () => {
      const response = await request(endpoints)
        .post("/sim")
        .send({ count, bet });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("totalWinnings");
      expect(response.body).toHaveProperty("netResult");
    });
  });
});
