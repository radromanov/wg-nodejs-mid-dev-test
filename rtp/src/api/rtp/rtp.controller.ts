import { Request, Response } from "express";

export class RtpController {
  constructor() {}

  handleRtp = async (_req: Request, res: Response) => {
    // TODO Calculate the RTP percentage based on all spins made so far.
    // Game/PlayService keeps track of totalSpins
    // Communicate with Game Microservice to obtain totalSpins and perform the calculation
    // Use Axios and create a gameApi instance
    res.status(200).json({ rtp: 100 });
  };
}
