import { Request, Response } from "express";
import { PlayService } from "./play.service";

export class PlayController {
  constructor(private readonly playService: PlayService) {}

  handlePlay = async (req: Request, res: Response) => {
    const { bet } = req.body;

    const matrix = this.playService.matrix;
    const symbols = this.playService.spin();
    const winnings = this.playService.calculateWinnings(symbols, bet);

    res.status(200).send({ matrix, winnings });
  };
}
