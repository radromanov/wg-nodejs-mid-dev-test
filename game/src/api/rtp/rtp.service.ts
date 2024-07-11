import { AxiosInstance } from "axios";

export class RtpService {
  constructor(private readonly rtpApi: AxiosInstance) {}

  async recordBet(amount: number) {
    try {
      // Calls the RTP API to increment the totalBets needed to perform the RTP calculation
      await this.rtpApi.post("/rtp/bets", { bet: amount });
    } catch (error) {
      throw error; // pass to catcher middleware
    }
  }

  async recordWinning(amount: number) {
    try {
      // Calls the RTP API to increment the totalWinnings needed to perform the RTP calculation
      await this.rtpApi.post("/rtp/winnings", { winning: amount });
    } catch (error) {
      throw error; // pass to catcher middleware
    }
  }
}
