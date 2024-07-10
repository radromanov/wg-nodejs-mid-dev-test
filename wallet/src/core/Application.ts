import { Express, json, urlencoded } from "express";
import { Config } from "./Config";

import { globalError } from "@lib/middlewares";
import { WalletController, WalletModule, WalletService } from "@api/wallet";

export class Application {
  constructor(private readonly app: Express, private readonly config: Config) {}

  private setup() {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  endpoints() {
    this.setup();

    const walletService = new WalletService();
    const walletController = new WalletController(walletService);
    const walletModule = new WalletModule(walletController);

    this.app.get("/", (_req, res) => res.json({ health: "ok" }));
    this.app.use("/wallet", walletModule.router);

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
