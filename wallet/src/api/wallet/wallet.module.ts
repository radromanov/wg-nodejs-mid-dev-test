import { Router } from "express";
import { WalletController } from "./wallet.controller";
import { catcher, validate } from "@lib/middlewares";
import { WalletInput } from "./wallet.schema";

export class WalletModule {
  private _router: Router;

  constructor(private readonly controller: WalletController) {
    this._router = Router();
  }

  get router() {
    this._router
      .post("/deposit", validate(WalletInput), this.controller.handleDeposit)
      .post(
        "/withdraw",
        validate(WalletInput),
        catcher(this.controller.handleWithdraw)
      )
      .get("/balance", this.controller.handleGetCurrentBalance);

    return this._router;
  }
}
