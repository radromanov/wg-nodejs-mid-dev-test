import { Express, json, urlencoded } from "express";
import { PlayModule } from "../api";

export class Application {
  constructor(private readonly app: Express) {}

  private setup() {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  endpoints() {
    this.setup();
    const playModule = new PlayModule().init();

    this.app.use("/api/game", playModule);

    return this.app;
  }

  listen(portNum?: number) {
    portNum = portNum || 3000;

    return this.app.listen(portNum, () =>
      console.log(`Game Service running on port ${portNum}`)
    );
  }
}
