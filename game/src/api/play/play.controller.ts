import { Request, Response } from "express";
import { PlayService } from "./play.service";
import { WalletService } from "@api/wallet";
import { RtpService } from "@api/rtp";

export class PlayController {
  constructor(
    private readonly playService: PlayService,
    private readonly walletService: WalletService,
    private readonly rtpService: RtpService
  ) {}

  handlePlay = async (req: Request, res: Response) => {
    const { bet } = req.body;

    await this.rtpService.updateBets(bet);
    await this.walletService.withdraw(bet);

    const { matrix, winnings } = await this.playService.play(bet);

    if (winnings) {
      await this.rtpService.updateWinnings(winnings);
      await this.walletService.deposit(winnings);
    }

    res.status(200).json({ matrix, winnings });
  };
}
