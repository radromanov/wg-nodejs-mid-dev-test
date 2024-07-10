import { Request, Response } from "express";
import { SimService } from "./sim.service";
import { WalletService } from "@api/wallet";

export class SimController {
  constructor(
    private readonly simService: SimService,
    private readonly walletService: WalletService
  ) {}

  handleSim = async (req: Request, res: Response) => {
    const { count, bet } = req.body;
    const totalBet = bet * count;

    await this.walletService.withdraw(totalBet);

    const totalWinnings = await this.simService.simulate(count, bet);

    if (totalWinnings) {
      await this.walletService.deposit(totalWinnings);
    }

    const netResult = totalWinnings - totalBet;

    res.status(200).json({ totalWinnings, netResult });
  };
}
