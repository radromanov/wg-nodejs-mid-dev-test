import request from "supertest";
import { app } from "@api/app";

describe("/rtp", () => {
  const endpoints = app.endpoints();

  describe("GET /", () => {
    it("should return the correct response body", async () => {
      const response = await request(endpoints).get("/rtp");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("rtp");
    });
  });
});
