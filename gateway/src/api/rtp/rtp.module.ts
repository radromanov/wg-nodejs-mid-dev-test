import { Router } from "express";
import { RtpController } from "./rtp.controller";
import { catcher } from "@lib/middlewares";

export class RtpModule {
  private _router: Router;

  constructor(private readonly controller: RtpController) {
    this._router = Router();
  }

  get router() {
    this._router.get("/", catcher(this.controller.handleGetBalance));
    this._router.post("/", catcher(this.controller.handleRecord));

    return this._router;
  }
}
