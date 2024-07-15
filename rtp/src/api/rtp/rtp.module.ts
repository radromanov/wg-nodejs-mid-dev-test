import { catcher, validate } from "@lib/middlewares";
import { Router } from "express";
import { RtpController } from "./rtp.controller";
import { RecordInput } from "./rtp.schema";
import { handleNotImplemented, handleOptions } from "@lib/utils";

export class RtpModule {
  private _router: Router;
  constructor(private readonly controller: RtpController) {
    this._router = Router();
  }

  get router() {
    this._router
      .get("/", catcher(this.controller.handleRtp))
      .post("/", validate(RecordInput), catcher(this.controller.handleRecord))
      .options("/", handleOptions(["GET", "POST", "OPTIONS"]))
      .put("/", handleNotImplemented)
      .patch("/", handleNotImplemented)
      .delete("/", handleNotImplemented);

    return this._router;
  }
}
