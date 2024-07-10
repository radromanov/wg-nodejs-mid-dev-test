import { Express, json, urlencoded } from "express";
import { Config } from "./Config";

import { RtpModule, RtpController } from "@api/rtp";

import { globalError } from "@lib/middlewares";

export class Application {
  constructor(private readonly app: Express, private readonly config: Config) {}

  private setup() {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  endpoints() {
    this.setup();

    const rtpController = new RtpController();
    const rtpModule = new RtpModule(rtpController);

    this.app.get("/", (_req, res) => res.json({ health: "ok" }));
    this.app.use("/rtp", rtpModule.router);

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
