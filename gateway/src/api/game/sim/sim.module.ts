import { Router } from "express";
import { SimController } from "./sim.controller";

export class SimModule {
  private _router: Router;

  constructor(private readonly simController: SimController) {
    this._router = Router();
  }

  get router() {
    this._router.post("/", this.simController.handleSim);

    return this._router;
  }
}
