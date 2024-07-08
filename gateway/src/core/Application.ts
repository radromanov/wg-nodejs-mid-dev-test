import { Express, json, urlencoded } from "express";
import { Config } from "../lib";
import axios from "axios";

export class Application {
  constructor(private readonly app: Express) {}

  private setup() {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  endpoints() {
    this.setup();

    this.app.post("/api/game/play", (req, res, next) => {
      axios
        .post("http://localhost:3001/api/game/play", req.body)

        .then((response) => res.send(response.data))
        .catch((error) => next(error));
    });

    return this.app;
  }

  listen(portNum?: number) {
    const config = new Config();
    const { port, env } = config.get();

    portNum = portNum || port;

    return this.app.listen(portNum, () =>
      console.log(`API Gateway running on port ${portNum} in ${env} mode`)
    );
  }
}
