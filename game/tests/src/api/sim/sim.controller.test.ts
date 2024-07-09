import express, { Express } from "express";
import request from "supertest";
import { Application } from "../../../../src/core";
import { IncomingMessage, Server, ServerResponse } from "http";
import { Config } from "../../../../src/lib";

describe("Sim Controller", () => {
  const bet = 100;
  const count = 5;
  let config: Config;
  let expr: Express;
  let app: Application;
  let server: Server<typeof IncomingMessage, typeof ServerResponse>;

  beforeAll(() => {
    config = new Config();
    expr = express();
    app = new Application(expr, config);
    app.endpoints();
    server = app.listen(4445);
  });

  afterAll(() => {
    server.close();
  });

  it("should throw a 400", async () => {
    const response = await request(server)
      .post("/sim")
      .send({ be: "some value" });

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("stack");
    expect(response.body).toHaveProperty("message");

    expect(response.body.status).toBe(400);
    expect(response.body.message.length).toBeTruthy();
  });

  it("should return the correct response body", async () => {
    const response = await request(server).post("/sim").send({ count, bet });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("totalWinnings");
    expect(response.body).toHaveProperty("netResult");
  });
});
