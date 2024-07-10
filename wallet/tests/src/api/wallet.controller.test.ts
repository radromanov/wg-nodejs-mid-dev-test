import { app } from "@api/app";
import request from "supertest";

describe("Wallet Controller", () => {
  const currentBalance = 1000;
  const endpoints = app.endpoints();

  it("should make a valid GET request and respond with currentBalance", async () => {
    const endpoint = "/wallet/balance";

    const response = await request(endpoints).get(endpoint);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("currentBalance");
    expect(response.body.currentBalance).toBe(currentBalance);
  });

  it("should make a valid POST request and deposit funds to the player's wallet", async () => {
    const endpoint = "/wallet/deposit";
    let depositAmount = 1000;

    const response = await request(endpoints)
      .post(endpoint)
      .send({ amount: depositAmount });

    expect(response.status).toBe(200);
  });

  it("should make a valid POST request and withdraw funds from the player's wallet", async () => {
    const endpoint = "/wallet/withdraw";
    let withdrawAmount = 1000;

    const response = await request(endpoints)
      .post(endpoint)
      .send({ amount: withdrawAmount });

    expect(response.status).toBe(200);
  });
});
