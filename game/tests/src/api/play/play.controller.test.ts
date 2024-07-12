import request from "supertest";
import { app } from "@api/app";

describe("/play", () => {
  const bet = 100;
  const endpoints = app.endpoints();

  // it("should return 405 for non-implemented methods", async () => {
  //   await request(endpoints).get(ROUTES.PLAY).expect(405);
  //   await request(endpoints).put(ROUTES.PLAY).expect(405);
  //   await request(endpoints).patch(ROUTES.PLAY).expect(405);
  //   await request(endpoints).delete(ROUTES.PLAY).expect(405);
  // });

  describe("POST /", () => {
    it("should return a 400 if invalid 'bet' sent", async () => {
      const response = await request(endpoints)
        .post("/play")
        .send({ bet: "123" });

      expect(response.status).toBe(400);
    });

    it("should return a 400 if no 'bet' sent", async () => {
      const response = await request(endpoints).post("/play").send();

      expect(response.status).toBe(400);
    });

    it("should return 200 and the correct response body", async () => {
      const response = await request(endpoints).post("/play").send({ bet });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("matrix");
      expect(Array.isArray(response.body.matrix)).toBeTruthy();
      expect(response.body).toHaveProperty("winnings");
    });
  });
});
