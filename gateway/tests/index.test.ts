import request from "supertest";
import express from "express";

const app = express();
app.use(express.json());

// Mocked routes for testing
app.post("/play", (_req, res) =>
  res.json({ matrix: [["A", "B", "C"]], winnings: 50 })
);

app.post("/sim", (_req, res) =>
  res.json({ totalWinnings: 500, netResult: 250 })
);

app.get("/rtp", (_req, res) => res.json({ rtp: 95 }));

describe("API Gateway", () => {
  it("should play a slot game", async () => {
    const res = await request(app).post("/play").send({ bet: 100 });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("matrix");
    expect(res.body).toHaveProperty("winnings");
  });

  it("should simulate number of spins", async () => {
    const res = await request(app).post("/sim").send({ count: 3, bet: 100 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("totalWinnings");
    expect(res.body).toHaveProperty("netResult");
  });

  it("should return Return-to-Player (RTP)", async () => {
    const res = await request(app).get("/rtp");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("rtp");
  });
});
