import { Router } from "express";

import { catcher, validate } from "@lib/middlewares";

import { SimInput } from "./sim.schema";
import { SimController } from "./sim.controller";
import { handleNotImplemented, handleOptions } from "@lib/utils";

export class SimModule {
  private _router: Router;
  constructor(private readonly controller: SimController) {
    this._router = Router();
  }

  get router() {
    this._router
      .post("/", validate(SimInput), catcher(this.controller.handleSim))
      .options("/", handleOptions(["POST", "OPTIONS"]))
      .get("/", handleNotImplemented)
      .put("/", handleNotImplemented)
      .patch("/", handleNotImplemented)
      .delete("/", handleNotImplemented);

    return this._router;
  }
}
