import { AppError } from "@core/AppError";
import { ROUTES } from "@lib/constants";
import { AxiosInstance } from "axios";

export class RtpService {
  constructor(private readonly rtpApi: AxiosInstance) {}

  async recordBet(amount: number) {
    try {
      if (typeof amount !== "number") {
        throw AppError.BadRequest(
          `Record Bet Error: Amount must be of type 'number'. Provided ${typeof amount}`
        );
      }
      if (amount <= 0) {
        throw AppError.BadRequest(
          "Record Bet Error: Amount must be a positive number"
        );
      }

      // Calls the RTP API to increment the totalBets needed to perform the RTP calculation
      return await this.rtpApi.post(ROUTES.RTP, { amount, type: "bet" });
    } catch (error) {
      throw error; // pass to catcher middleware
    }
  }

  async recordWinning(amount: number) {
    try {
      if (typeof amount !== "number") {
        throw AppError.BadRequest(
          `Record Winning Error: Amount must be of type 'number'. Provided ${typeof amount}`
        );
      }
      if (amount <= 0) {
        throw AppError.BadRequest(
          "Record Winning Error: Amount must be a positive number"
        );
      }

      // Calls the RTP API to increment the totalWinnings needed to perform the RTP calculation
      return await this.rtpApi.post(ROUTES.RTP, { amount, type: "winning" });
    } catch (error) {
      throw error; // pass to catcher middleware
    }
  }
}
