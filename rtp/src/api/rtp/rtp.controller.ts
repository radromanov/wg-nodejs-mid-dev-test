import { Request, Response } from "express";
import { RtpService } from "./rtp.service";

export class RtpController {
  constructor(private readonly service: RtpService) {}

  handleRtp = async (_req: Request, res: Response) => {
    const rtp = this.service.calculateRtp();

    res.status(200).json({ rtp });
  };

  handleRecordBet = async (req: Request, res: Response) => {
    const { bet } = req.body;

    this.service.recordBet(bet);

    res.sendStatus(200);
  };

  handleRecordWinning = async (req: Request, res: Response) => {
    const { winning } = req.body;

    this.service.recordWinning(winning);

    res.sendStatus(200);
  };
}
