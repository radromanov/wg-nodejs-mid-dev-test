import request from "supertest";
import { endpoints, server } from "@root";

describe("Play Controller", () => {
  const bet = 100;
  let serviceRoutes = endpoints;
  let serviceServer = server;

  afterAll(() => {
    serviceServer.close();
  });

  it("should return the correct response body", async () => {
    const response = await request(serviceRoutes).post("/play").send({ bet });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("matrix");
    expect(Array.isArray(response.body.matrix)).toBeTruthy();

    expect(response.body).toHaveProperty("winnings");
  });
});
