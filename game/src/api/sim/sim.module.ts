import { Router } from "express";
import { catcher, validate } from "../../lib";
import { SimInput } from "./sim.schema";
import { SimController } from "./sim.controller";

export class SimModule {
  private _router: Router;
  constructor(private readonly controller: SimController) {
    this._router = Router();
  }

  get router() {
    this._router.post(
      "/sim",
      validate(SimInput),
      catcher(this.controller.handleSim)
    );

    return this._router;
  }
}
