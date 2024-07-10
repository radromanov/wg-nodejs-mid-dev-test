import request from "supertest";
import { app } from "@api/app";

describe("Play Controller", () => {
  const bet = 100;
  const endpoints = app.endpoints();

  it("should return the correct response body", async () => {
    const response = await request(endpoints).post("/play").send({ bet });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("matrix");
    expect(Array.isArray(response.body.matrix)).toBeTruthy();
    expect(response.body).toHaveProperty("winnings");
  });
});
