export class RtpService {
  private totalBets: number;
  private totalWinnings: number;

  constructor() {
    this.totalBets = 0;
    this.totalWinnings = 0;
  }

  calculateRtp() {
    if (this.totalBets === 0) {
      return 0;
    }

    const rtp = (this.totalWinnings / this.totalBets) * 100;
    return rtp.toFixed(2);
  }

  updateBets(bet: number) {
    this.totalBets += bet;
  }

  updateWinnings(winning: number) {
    this.totalWinnings += winning;
  }
}
