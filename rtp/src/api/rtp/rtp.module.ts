import { catcher } from "@lib/middlewares";
import { Router } from "express";
import { RtpController } from "./rtp.controller";

export class RtpModule {
  private _router: Router;
  constructor(private readonly controller: RtpController) {
    this._router = Router();
  }

  get router() {
    this._router
      .get("/", catcher(this.controller.handleRtp))
      .post("/bets", catcher(this.controller.handleUpdateBets))
      .post("/winnings", catcher(this.controller.handleUpdateWinnings));

    return this._router;
  }
}
