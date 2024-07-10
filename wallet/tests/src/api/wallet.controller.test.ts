import { app } from "@api/app";
import request from "supertest";

describe("/wallet", () => {
  const endpoints = app.endpoints();

  describe("/GET /balance", () => {
    const currentBalance = 1000;

    it("should make a valid GET request and respond with currentBalance", async () => {
      const endpoint = "/wallet/balance";

      const response = await request(endpoints).get(endpoint);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("currentBalance");
      expect(response.body.currentBalance).toBe(currentBalance);
    });
  });

  describe("/POST /deposit", () => {
    it("should make a valid POST request and deposit funds to the player's wallet", async () => {
      const endpoint = "/wallet/deposit";
      let depositAmount = 1000;

      const response = await request(endpoints)
        .post(endpoint)
        .send({ amount: depositAmount });

      expect(response.status).toBe(200);
    });
  });

  describe("/POST /withdraw", () => {
    it("should make a valid POST request and withdraw funds from the player's wallet", async () => {
      const endpoint = "/wallet/withdraw";
      let withdrawAmount = 1000;

      const response = await request(endpoints)
        .post(endpoint)
        .send({ amount: withdrawAmount });

      expect(response.status).toBe(200);
    });
  });
});
