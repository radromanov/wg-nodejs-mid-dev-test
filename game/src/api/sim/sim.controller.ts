import { Request, Response } from "express";
import { SimService } from "./sim.service";

export class SimController {
  constructor(private readonly simService: SimService) {}

  handleSim = async (req: Request, res: Response) => {
    const { count, bet } = req.body;

    const { totalWinnings, netResult } = this.simService.simulate(count, bet);

    res.status(200).json({ totalWinnings, netResult });
  };
}
