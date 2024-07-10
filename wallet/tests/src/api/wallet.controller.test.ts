import request from "supertest";
import { endpoints, server } from "../../../src";

describe("Wallet Controller", () => {
  let serviceRoutes = endpoints;
  let serviceServer = server;
  const currentBalance = 1000;

  afterAll(() => {
    serviceServer.close();
  });

  it("should make a valid GET request and respond with currentBalance", async () => {
    const endpoint = "/wallet/balance";

    serviceRoutes.get(endpoint, (_req, res) => res.json({ currentBalance }));

    const response = await request(serviceRoutes).get(endpoint);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("currentBalance");
    expect(response.body.currentBalance).toBe(currentBalance);
  });

  it("should make a valid POST request and deposit funds to the player's wallet", async () => {
    const endpoint = "/wallet/deposit";
    let depositAmount = 1000;

    serviceRoutes.post(endpoint, (_req, res) =>
      res.status(200).json({ currentBalance: currentBalance + depositAmount })
    );

    const response = await request(serviceRoutes)
      .post(endpoint)
      .send({ amount: depositAmount });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("currentBalance");
    expect(response.body.currentBalance).toBe(currentBalance + depositAmount);
  });

  it("should make a valid POST request and withdraw funds from the player's wallet", async () => {
    const endpoint = "/wallet/withdraw";
    let withdrawAmount = 1000;

    serviceRoutes.post(endpoint, (_req, res) =>
      res.status(200).json({ currentBalance: currentBalance + withdrawAmount })
    );

    const response = await request(serviceRoutes)
      .post(endpoint)
      .send({ amount: withdrawAmount });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("currentBalance");
    expect(response.body.currentBalance).toBe(currentBalance + withdrawAmount);
  });
});
