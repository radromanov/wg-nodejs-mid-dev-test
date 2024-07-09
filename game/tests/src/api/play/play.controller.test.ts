import express, { Express } from "express";
import request from "supertest";
import { Application } from "../../../../src/core";
import { IncomingMessage, Server, ServerResponse } from "http";

describe("Play Controller", () => {
  const bet = 100;
  let expr: Express;
  let app: Application;
  let server: Server<typeof IncomingMessage, typeof ServerResponse>;

  beforeAll(() => {
    expr = express();
    app = new Application(expr);
    app.endpoints();
    server = app.listen(4444);
  });

  afterAll(() => {
    server.close();
  });

  it("should return the correct response when playing the game", async () => {
    const response = await request(server).post("/api/game/play").send({ bet });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("matrix");
    expect(Array.isArray(response.body.matrix)).toBeTruthy();

    expect(response.body).toHaveProperty("winnings");
  });
});
