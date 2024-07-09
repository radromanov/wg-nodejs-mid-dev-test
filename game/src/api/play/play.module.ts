import { Router } from "express";
import { PlayController } from "./play.controller";
import { validate } from "../../lib/middlewares";
import { PlayInput } from "./play.schema";

export class PlayModule {
  private _router: Router;
  constructor(private readonly controller: PlayController) {
    this._router = Router();
  }

  get router() {
    this._router.post("/play", validate(PlayInput), this.controller.handlePlay);

    return this._router;
  }
}
