import { Request, Response } from "express";
import { WalletService } from "./wallet.service";

export class WalletController {
  constructor(private readonly service: WalletService) {}

  handleDeposit = async (req: Request, res: Response) => {
    // Validated using validate() middleware
    const { amount } = req.body;

    this.service.deposit(amount);

    res.sendStatus(200);
  };

  handleWithdraw = async (req: Request, res: Response) => {
    // Validated using validate() middleware
    const { amount } = req.body;

    // May throw an error, handled by try/catch wrapper
    this.service.withdraw(amount);

    res.sendStatus(200);
  };

  handleGetCurrentBalance = async (_req: Request, res: Response) => {
    const currentBalance = this.service.getCurrentBalance();

    res.status(200).json({ currentBalance });
  };
}
