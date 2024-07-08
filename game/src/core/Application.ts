import { Express, json, urlencoded } from "express";
import { Config } from "../lib";

export class Application {
  constructor(private readonly app: Express) {}

  private setup() {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  endpoints() {
    this.setup();

    return this.app;
  }

  listen(portNum?: number) {
    const config = new Config();
    const { port, env } = config.get();

    portNum = portNum || port;

    return this.app.listen(portNum, () =>
      console.log(`Game Service running on port ${portNum} in ${env} mode`)
    );
  }
}
