import { Request, Response } from "express";
import { PlayService } from "./play.service";

export class PlayController {
  constructor(private readonly playService: PlayService) {}

  handlePlay = async (req: Request, res: Response) => {
    const { bet } = req.body;

    const { matrix, winnings } = this.playService.play(bet);

    res.status(200).json({ matrix, winnings });
  };
}
