export class RtpService {
  private totalBets: number;
  private totalWinnings: number;

  constructor() {
    this.totalBets = 0;
    this.totalWinnings = 0;
  }

  calculateRtp() {
    return this.totalBets === 0 // Avoid zero-divison
      ? 0
      : (this.totalWinnings / this.totalBets) * 100;
  }

  recordBet(amount: number) {
    this.totalBets += amount;
  }

  recordWinning(amount: number) {
    this.totalWinnings += amount;
  }
}
