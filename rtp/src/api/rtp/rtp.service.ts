export class RtpService {
  private totalBets: number;
  private totalWinnings: number;

  constructor() {
    this.totalBets = 0;
    this.totalWinnings = 0;
  }

  updateBets(bet: number) {
    this.totalBets += bet;
    console.log("NEW TOTAL BETS:", this.totalBets);
  }

  updateWinnings(winning: number) {
    this.totalWinnings += winning;
    console.log("NEW TOTAL WINNINGS:", this.totalWinnings);
  }
}
