import { Express, json, urlencoded } from "express";
import { Config } from "./Config";
import { globalError, ROUTES } from "../lib";
import { PlayController, PlayModule } from "@api/game/play";
import { gameApi, rtpApi, walletApi } from "@lib/axios";
import { SimModule, SimController } from "@api/game/sim";
import { WalletController, WalletModule } from "@api/wallet";
import { RtpController, RtpModule } from "@api/rtp";

export class Application {
  constructor(private readonly app: Express, private readonly config: Config) {}

  private setup() {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  endpoints() {
    this.setup();

    const playController = new PlayController(gameApi);
    const simController = new SimController(gameApi);
    const walletController = new WalletController(walletApi);
    const rtpController = new RtpController(rtpApi);

    const playModule = new PlayModule(playController);
    const simModule = new SimModule(simController);
    const walletModule = new WalletModule(walletController);
    const rtpModule = new RtpModule(rtpController);

    this.app.get("/", (_req, res) => res.json({ health: "ok" }));
    this.app
      .use(ROUTES.PLAY, playModule.router)
      .use(ROUTES.SIM, simModule.router)
      .use(ROUTES.WALLET.ROOT, walletModule.router)
      .use(ROUTES.RTP, rtpModule.router);

    this.app.use(globalError);

    return this.app;
  }

  listen(portNum?: number) {
    portNum = portNum || this.config.get("port");

    return this.app.listen(portNum, () =>
      console.log(`API Gateway running on port ${portNum}`)
    );
  }
}
