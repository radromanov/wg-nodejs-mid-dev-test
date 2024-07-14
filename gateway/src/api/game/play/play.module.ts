import { Router } from "express";
import { PlayController } from "./play.controller";

export class PlayModule {
  private _router: Router;

  constructor(private readonly playController: PlayController) {
    this._router = Router();
  }

  get router() {
    this._router.post("/", this.playController.handlePlay);

    return this._router;
  }
}
