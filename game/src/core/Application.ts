import { Express, json, urlencoded } from "express";
import {
  PlayController,
  PlayModule,
  PlayService,
  SimController,
  SimModule,
  SimService,
} from "../api";
import { globalError } from "../lib";

export class Application {
  constructor(private readonly app: Express) {}

  private setup() {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  endpoints() {
    this.setup();
    const playService = new PlayService();
    const playController = new PlayController(playService);
    const playModule = new PlayModule(playController);

    const simService = new SimService(playService);
    const simController = new SimController(simService);
    const simModule = new SimModule(simController);

    this.app.use("/play", playModule.router);
    this.app.use("/sim", simModule.router);

    this.app.use(globalError);

    return this.app;
  }

  listen(portNum?: number) {
    portNum = portNum || 3000;

    return this.app.listen(portNum, () =>
      console.log(`Game Service running on port ${portNum}`)
    );
  }
}
