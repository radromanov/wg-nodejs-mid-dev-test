import { Request, Response } from "express";

import { SimService } from "./sim.service";

import { WalletService } from "@api/wallet";
import { RtpService } from "@api/rtp";

export class SimController {
  constructor(
    private readonly simService: SimService,
    private readonly walletService: WalletService,
    private readonly rtpService: RtpService
  ) {}

  handleSim = async (req: Request, res: Response) => {
    const { count, bet } = req.body;
    const totalBet = bet * count;

    await this.rtpService.recordBet(bet);
    await this.walletService.withdraw(totalBet);

    const totalWinnings = await this.simService.simulate(count, bet);

    if (totalWinnings) {
      await this.rtpService.recordWinning(totalWinnings);
      await this.walletService.deposit(totalWinnings);
    }

    const netResult = totalWinnings - totalBet;

    res.status(200).json({ totalWinnings, netResult });
  };
}
