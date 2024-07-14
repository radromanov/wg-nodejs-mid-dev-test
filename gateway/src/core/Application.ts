import { Express, json, urlencoded } from "express";
import axios from "axios";
import { Config } from "./Config";
import { globalError, ROUTES } from "../lib";
import { PlayController, PlayModule } from "@api/game/play";
import { gameApi } from "@lib/axios";

export class Application {
  constructor(private readonly app: Express, private readonly config: Config) {}

  private setup() {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  endpoints() {
    this.setup();
    const { gameServiceUrl, walletServiceUrl, rtpServiceUrl } =
      this.config.get();

    const playController = new PlayController(gameApi);
    const playModule = new PlayModule(playController);

    this.app.get("/", (_req, res) => res.json({ health: "ok" }));
    this.app
      .use(ROUTES.PLAY, playModule.router)
      .post("/sim", async (req, res, next) => {
        try {
          const response = await axios.post<{
            totalWinnings: number;
            netResult: number;
          }>(`${gameServiceUrl}/sim`, req.body);

          res.status(response.status).json({
            totalWinnings: response.data.totalWinnings,
            netResult: response.data.netResult,
          });
        } catch (error) {
          next(error);
        }
      })
      .post("/wallet/deposit", async (req, res, next) => {
        try {
          const response = await axios.post(
            `${walletServiceUrl}/wallet/deposit`,
            req.body
          );

          res.sendStatus(response.status);
        } catch (error) {
          next(error);
        }
      })
      .post("/wallet/withdraw", async (req, res, next) => {
        try {
          const response = await axios.post(
            `${walletServiceUrl}/wallet/withdraw`,
            req.body
          );

          res.sendStatus(response.status);
        } catch (error) {
          next(error);
        }
      })
      .get("/wallet/balance", async (_req, res, next) => {
        try {
          const response = await axios.get<{ currentBalance: number }>(
            `${walletServiceUrl}/wallet/balance`
          );

          res
            .status(response.status)
            .json({ currentBalance: response.data.currentBalance });
        } catch (error) {
          next(error);
        }
      })
      .get("/rtp", async (_req, res, next) => {
        try {
          const response = await axios.get<{ rtp: number }>(
            `${rtpServiceUrl}/rtp`
          );

          res.status(response.status).json({ rtp: response.data.rtp });
        } catch (error) {
          next(error);
        }
      })
      .post("/rtp", async (req, res, next) => {
        try {
          const response = await axios.post(`${rtpServiceUrl}/rtp`, req.body);

          res.sendStatus(response.status);
        } catch (error) {
          next(error);
        }
      });

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
