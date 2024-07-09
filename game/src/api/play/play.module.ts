import { Router } from "express";
import { PlayController } from "./play.controller";

export class PlayModule {
  private _router: Router;
  constructor(private readonly controller: PlayController) {
    this._router = Router();
  }

  get router() {
    this._router.post("/play", this.controller.handlePlay);

    return this._router;
  }
}
