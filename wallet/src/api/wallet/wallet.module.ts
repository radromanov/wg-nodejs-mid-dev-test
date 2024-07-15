import { Router } from "express";

import { WalletController } from "./wallet.controller";
import { WalletInput } from "./wallet.schema";

import { catcher, validate } from "@lib/middlewares";
import { ROUTES } from "@lib/constants";
import { handleNotImplemented, handleOptions } from "@lib/utils";

export class WalletModule {
  private _router: Router;

  constructor(private readonly controller: WalletController) {
    this._router = Router();
  }

  get router() {
    this._router
      .post(
        ROUTES.DEPOSIT,
        validate(WalletInput),
        catcher(this.controller.handleDeposit)
      )
      .options(ROUTES.DEPOSIT, handleOptions(["POST", "OPTIONS"]))
      .get(ROUTES.DEPOSIT, handleNotImplemented)
      .put(ROUTES.DEPOSIT, handleNotImplemented)
      .patch(ROUTES.DEPOSIT, handleNotImplemented)
      .delete(ROUTES.DEPOSIT, handleNotImplemented);

    this._router
      .post(
        ROUTES.WITHDRAW,
        validate(WalletInput),
        catcher(this.controller.handleWithdraw)
      )
      .options(ROUTES.WITHDRAW, handleOptions(["POST", "OPTIONS"]))
      .get(ROUTES.WITHDRAW, handleNotImplemented)
      .put(ROUTES.WITHDRAW, handleNotImplemented)
      .patch(ROUTES.WITHDRAW, handleNotImplemented)
      .delete(ROUTES.WITHDRAW, handleNotImplemented);

    this._router
      .get(ROUTES.BALANCE, catcher(this.controller.handleGetCurrentBalance))
      .options(ROUTES.BALANCE, handleOptions(["GET", "OPTIONS"]))
      .post(ROUTES.BALANCE, handleNotImplemented)
      .put(ROUTES.BALANCE, handleNotImplemented)
      .patch(ROUTES.BALANCE, handleNotImplemented)
      .delete(ROUTES.BALANCE, handleNotImplemented);

    return this._router;
  }
}
