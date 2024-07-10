import { Express, json, urlencoded } from "express";

import { globalError } from "@lib/middlewares";

import { Config } from "@core/Config";

import { PlayController, PlayModule, PlayService } from "@api/play";
import { SimController, SimModule, SimService } from "@api/sim";
import { WalletService } from "@api/wallet";
import { rtpApi, walletApi } from "@lib/axios";
import { RtpService } from "@api/rtp";

export class Application {
  constructor(private readonly app: Express, private readonly config: Config) {}

  private setup() {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  endpoints() {
    this.setup();

    const walletService = new WalletService(walletApi);
    const rtpService = new RtpService(rtpApi);

    const playService = new PlayService();
    const playController = new PlayController(
      playService,
      walletService,
      rtpService
    );
    const playModule = new PlayModule(playController);

    const simService = new SimService(playService);
    const simController = new SimController(simService, walletService);
    const simModule = new SimModule(simController);

    this.app.get("/", (_req, res) => res.json({ health: "ok" }));
    this.app.use("/play", playModule.router);
    this.app.use("/sim", simModule.router);

    this.app.use(globalError);

    return this.app;
  }

  listen(portNum?: number) {
    portNum = portNum || this.config.get("port");

    return this.app.listen(portNum, () =>
      console.log(`Game Service running on port ${portNum}`)
    );
  }
}
