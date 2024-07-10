import "module-alias/register";
import request from "supertest";
import express, { Express } from "express";
import { Application } from "@core/Application";
import { Config } from "@core/Config";
import { IncomingMessage, Server, ServerResponse } from "http";

describe("Wallet Service entrypoint", () => {
  let config: Config;
  let expr: Express;
  let app: Application;
  let server: Server<typeof IncomingMessage, typeof ServerResponse>;

  beforeAll(() => {
    config = new Config();
    expr = express();
    app = new Application(expr, config);
    app.endpoints();
    server = app.listen(4446);
  });

  afterAll(() => server.close());

  it("should make a valid GET request", async () => {
    expr.get("/", (_req, res) => res.json({ health: "OK" }));

    const response = await request(expr).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("health");
  });

  it("should receive a 404", async () => {
    const endpoint = "/not-found";
    expr.get(endpoint, (_req, res) => res.sendStatus(404));

    const response = await request(expr).get(endpoint);

    expect(response.status).toBe(404);
  });
});
