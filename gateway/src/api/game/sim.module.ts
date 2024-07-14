import { ROUTES } from "@lib/constants";
import { Router } from "express";

export class SimModule {
  private _router: Router;

  constructor() {
    this._router = Router();
  }

  get router() {
    this._router.post(ROUTES.SIM);

    return this._router;
  }
}
