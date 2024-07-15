import { ROUTES } from "@lib/constants";
import { Router } from "express";
import { WalletController } from "./wallet.controller";

export class WalletModule {
  private _router: Router;

  constructor(private readonly walletController: WalletController) {
    this._router = Router();
  }

  get router() {
    this._router.post(
      ROUTES.WALLET.DEPOSIT,
      this.walletController.handleDeposit
    );
    this._router.post(
      ROUTES.WALLET.WITHDRAW,
      this.walletController.handleWithdraw
    );
    this._router.get(
      ROUTES.WALLET.BALANCE,
      this.walletController.handleBalance
    );

    return this._router;
  }
}
