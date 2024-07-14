import { Request, Response } from "express";
import { ROUTES } from "@lib/constants";
import { AxiosInstance } from "axios";

export class PlayController {
  constructor(private readonly gameApi: AxiosInstance) {}

  handlePlay = async (req: Request, res: Response) => {
    try {
      const response = await this.gameApi.post<{
        matrix: string[][];
        winnings: number;
      }>(ROUTES.PLAY, req.body);

      res.status(response.status).json({
        matrix: response.data.matrix,
        winnings: response.data.winnings,
      });
    } catch (error) {
      throw error; // pass to error handling middleware
    }
  };
}
