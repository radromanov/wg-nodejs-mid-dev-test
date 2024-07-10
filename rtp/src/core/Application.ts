import { Express, json, urlencoded } from "express";
import { Config } from "./Config";

import { globalError } from "@lib/middlewares";

export class Application {
  constructor(private readonly app: Express, private readonly config: Config) {}

  private setup() {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  endpoints() {
    this.setup();

    this.app.get("/", (_req, res) => res.json({ health: "ok" }));

    this.app.use(globalError);

    return this.app;
  }

  listen(portNum?: number) {
    portNum = portNum || this.config.get("port");

    return this.app.listen(portNum, () =>
      console.log(`Wallet Service running on port ${portNum}`)
    );
  }
}
