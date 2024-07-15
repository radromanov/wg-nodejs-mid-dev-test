import { Router } from "express";
import { PlayController } from "./play.controller";
import { catcher } from "@lib/middlewares";

export class PlayModule {
  private _router: Router;

  constructor(private readonly playController: PlayController) {
    this._router = Router();
  }

  get router() {
    this._router.post("/", catcher(this.playController.handlePlay));

    return this._router;
  }
}
