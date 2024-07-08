import request from "supertest";
import express from "express";

const app = express();
app.use(express.json());

// Mocked routes for testing
app.post("/play", (_req, res) =>
  res.json({ matrix: [["A", "B", "C"]], winnings: 50 })
);

describe("API Gateway", () => {
  it("should play a slot game", async () => {
    const res = await request(app).post("/play").send({ bet: 100 });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("matrix");
    expect(res.body).toHaveProperty("winnings");
  });
});
