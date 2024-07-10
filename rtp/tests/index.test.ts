import request from "supertest";
import { app } from "@api/app";

describe("RTP Service entrypoint", () => {
  const endpoints = app.endpoints();

  it("should make a valid GET request", async () => {
    const response = await request(endpoints).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("health");
  });

  it("should receive a 404", async () => {
    const response = await request(endpoints).get("/not-found");

    expect(response.status).toBe(404);
  });
});
