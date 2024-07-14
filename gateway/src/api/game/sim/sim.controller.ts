import { Request, Response } from "express";
import { ROUTES } from "@lib/constants";
import { AxiosInstance } from "axios";

export class SimController {
  constructor(private readonly gameApi: AxiosInstance) {}

  handleSim = async (req: Request, res: Response) => {
    try {
      const response = await this.gameApi.post<{
        totalWinnings: number;
        netResult: number;
      }>(ROUTES.SIM, req.body);

      res.status(response.status).json({
        totalWinnings: response.data.totalWinnings,
        netResult: response.data.netResult,
      });
    } catch (error) {
      throw error; // pass to error handling middleware
    }
  };
}
