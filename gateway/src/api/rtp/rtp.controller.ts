import { Request, Response } from "express";
import { AxiosInstance } from "axios";

export class RtpController {
  constructor(private readonly rtpApi: AxiosInstance) {}

  handleGetBalance = async (_req: Request, res: Response) => {
    try {
      const response = await this.rtpApi.get<{ rtp: number }>("/");

      res.status(response.status).json({ rtp: response.data.rtp });
    } catch (error) {
      throw error; // pass to error handling middleware
    }
  };

  handleRecord = async (req: Request, res: Response) => {
    try {
      const response = await this.rtpApi.post("/", req.body);

      res.sendStatus(response.status);
    } catch (error) {
      throw error; // pass to error handling middleware
    }
  };
}
