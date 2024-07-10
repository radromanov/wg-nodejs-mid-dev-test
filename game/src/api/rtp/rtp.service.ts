import { AxiosInstance } from "axios";

export class RtpService {
  constructor(private readonly rtpApi: AxiosInstance) {}

  async updateBets(bet: number) {
    try {
      await this.rtpApi.post("/rtp/bets", { bet });
    } catch (error) {
      throw error; // pass to catcher middleware
    }
  }

  async updateWinnings(winning: number) {
    try {
      await this.rtpApi.post("/rtp/winnings", { winning });
    } catch (error) {
      throw error; // pass to catcher middleware
    }
  }
}
