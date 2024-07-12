import { Router } from "express";

import { catcher, validate } from "@lib/middlewares";
import { handleNotImplemented, handleOptions } from "@lib/utils";

import { PlayController } from "./play.controller";
import { PlayInput } from "./play.schema";

export class PlayModule {
  private _router: Router;
  constructor(private readonly controller: PlayController) {
    this._router = Router();
  }

  get router() {
    this._router.post(
      "/",
      validate(PlayInput),
      catcher(this.controller.handlePlay)
    );

    this._router.options("/", handleOptions(["POST", "OPTIONS"]));
    this._router.get("/", handleNotImplemented);
    this._router.put("/", handleNotImplemented);
    this._router.patch("/", handleNotImplemented);
    this._router.delete("/", handleNotImplemented);

    return this._router;
  }
}
