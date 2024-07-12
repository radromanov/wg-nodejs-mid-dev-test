import { Request, Response } from "express";
import { RtpService } from "./rtp.service";
import { RecordInput } from "./rtp.schema";

export class RtpController {
  constructor(private readonly service: RtpService) {}

  handleRtp = async (_req: Request, res: Response) => {
    const rtp = this.service.calculateRtp();

    res.status(200).json({ rtp });
  };

  handleRecord = async (req: Request<{}, {}, RecordInput>, res: Response) => {
    const { amount, type } = req.body;

    switch (type) {
      case "bet":
        this.service.recordBet(amount);
        break;
      case "winning":
        this.service.recordWinning(amount);
        break;
    }

    res.sendStatus(200);
  };
}
