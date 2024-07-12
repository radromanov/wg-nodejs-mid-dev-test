import { Router } from "express";

import { catcher, validate } from "@lib/middlewares";

import { PlayController } from "./play.controller";
import { PlayInput } from "./play.schema";
import { handleNotImplemented } from "@lib/utils";
import { Config } from "@core/Config";

export class PlayModule {
  private _router: Router;
  constructor(
    private readonly controller: PlayController,
    private readonly config: Config
  ) {
    this._router = Router();
  }

  get router() {
    this._router.post(
      "/",
      validate(PlayInput),
      catcher(this.controller.handlePlay)
    );

    this._router.options("/", (_req, res) => {
      const gatewayUrl = this.config.get("gatewayUrl");

      res.header("Access-Control-Allow-Methods", "POST,OPTIONS");
      res.header("Access-Control-Allow-Origin", gatewayUrl);
      res.header("Accept", "application/json");

      res.sendStatus(204);
    });

    this._router.get("/", handleNotImplemented);
    this._router.put("/", handleNotImplemented);
    this._router.patch("/", handleNotImplemented);
    this._router.delete("/", handleNotImplemented);

    return this._router;
  }
}
