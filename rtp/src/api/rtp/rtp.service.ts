import { AppError } from "@core/AppError";

export class RtpService {
  private _totalBets: number;
  private _totalWinnings: number;

  constructor() {
    this._totalBets = 0;
    this._totalWinnings = 0;
  }

  calculateRtp() {
    return this._totalBets === 0 // Avoid zero-divison
      ? 0
      : (this._totalWinnings / this._totalBets) * 100;
  }

  recordBet(amount: number) {
    if (typeof amount !== "number") {
      throw AppError.BadRequest(
        `Amount must be of type 'number'. Provided ${typeof amount}`
      );
    }
    if (amount <= 0) {
      throw AppError.BadRequest("Amount must be a positive number");
    }
    this._totalBets += amount;
  }

  recordWinning(amount: number) {
    if (typeof amount !== "number") {
      throw AppError.BadRequest(
        `Amount must be of type 'number'. Provided ${typeof amount}`
      );
    }
    if (amount <= 0) {
      throw AppError.BadRequest("Amount must be a positive number");
    }

    this._totalWinnings += amount;
  }

  get totalBets() {
    return this._totalBets;
  }
  get totalWinnings() {
    return this._totalWinnings;
  }
}
