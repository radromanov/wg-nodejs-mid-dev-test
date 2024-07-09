import { Express, json, urlencoded } from "express";
import { PlayController, PlayModule, PlayService } from "../api";

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

    this.app.use("/api/game", playModule.router);

    return this.app;
  }

  listen(portNum?: number) {
    portNum = portNum || 3000;

    return this.app.listen(portNum, () =>
      console.log(`Game Service running on port ${portNum}`)
    );
  }
}
