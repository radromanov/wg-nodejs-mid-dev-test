import { Request, Response } from "express";
import { AxiosInstance } from "axios";
import { ROUTES } from "@lib/constants";

export class WalletController {
  constructor(private readonly walletApi: AxiosInstance) {}

  handleDeposit = async (req: Request, res: Response) => {
    try {
      const response = await this.walletApi.post(
        ROUTES.WALLET.DEPOSIT,
        req.body
      );

      res.sendStatus(response.status);
    } catch (error) {
      throw error; // pass to error handling middleware
    }
  };

  handleWithdraw = async (req: Request, res: Response) => {
    try {
      const response = await this.walletApi.post(
        ROUTES.WALLET.WITHDRAW,
        req.body
      );

      res.sendStatus(response.status);
    } catch (error) {
      throw error; // pass to error handling middleware
    }
  };

  handleBalance = async (_req: Request, res: Response) => {
    try {
      const response = await this.walletApi.get<{ currentBalance: number }>(
        ROUTES.WALLET.BALANCE
      );

      res
        .status(response.status)
        .json({ currentBalance: response.data.currentBalance });
    } catch (error) {
      throw error; // pass to error handling middleware
    }
  };
}
