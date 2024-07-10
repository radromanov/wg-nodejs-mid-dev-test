import request from "supertest";
import { app } from "@api/app";

describe("/play", () => {
  const bet = 100;
  const endpoints = app.endpoints();

  describe("/POST /", () => {
    it("should return the correct response body", async () => {
      const response = await request(endpoints).post("/play").send({ bet });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("matrix");
      expect(Array.isArray(response.body.matrix)).toBeTruthy();
      expect(response.body).toHaveProperty("winnings");
    });

    it("should return a 400", async () => {
      const response = await request(endpoints)
        .post("/play")
        .send({ bets: bet });

      expect(response.status).toBe(400);
    });
  });
});
