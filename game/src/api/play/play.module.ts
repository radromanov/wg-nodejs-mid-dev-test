import { Router } from "express";

import { catcher, validate } from "@lib/middlewares";

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

    return this._router;
  }
}
