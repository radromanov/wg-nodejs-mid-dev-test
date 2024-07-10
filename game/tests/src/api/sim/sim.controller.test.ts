import request from "supertest";
import { app } from "@api/app";

describe("Sim Controller", () => {
  const bet = 100;
  const count = 5;
  const endpoints = app.endpoints();

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
    const response = await request(endpoints).post("/sim").send({ count, bet });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("totalWinnings");
    expect(response.body).toHaveProperty("netResult");
  });
});
