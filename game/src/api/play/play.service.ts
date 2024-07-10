import { AppError } from "@core/AppError";
import {
  BET_MULTIPLIER,
  SLOT_COLS,
  SLOT_ROWS,
  SLOT_SYMBOLS,
} from "@lib/constants";
import { allEqual, rand } from "@lib/utils";

export class PlayService {
  private totalSpins: number;
  private matrix: string[][];
  private wallet: number;

  constructor(initialWallet = 1000) {
    this.totalSpins = 0;
    this.matrix = this.generateMatrix();
    this.wallet = initialWallet;
  }

  play(bet: number) {
    this.deductBet(bet);

    const symbols = this.spin();
    const winnings = this.calculateWinnings(symbols, bet);

    this.updateWallet(winnings);

    return { matrix: this.matrix, winnings };
  }

  private spin() {
    // Perform a random spin on the matrix
    const symbols: string[] = [];

    for (let i = 0; i < this.matrix.length; i++) {
      const currentSymbolSet = this.matrix[i];

      const randomIndex = rand(currentSymbolSet.length);
      const randomSymbol = currentSymbolSet[randomIndex];

      symbols.push(randomSymbol);
    }

    this.totalSpins++;

    return symbols;
  }

  private calculateWinnings(symbols: string[], bet: number) {
    const winnings = allEqual(symbols) ? bet * BET_MULTIPLIER : 0;
    return winnings;
  }

  private deductBet(bet: number) {
    if (bet > this.wallet) {
      throw AppError.BadRequest(`Insufficient funds to make bet of ${bet}.`);
    }

    this.wallet -= bet; // Should be part of TODO WalletService
    return this.wallet;
  }

  private updateWallet(amount: number) {
    this.wallet += amount; // Should be part of TODO WalletService
    return this.wallet;
  }

  private generateMatrix() {
    const matrix: string[][] = [];
    for (let i = 0; i < SLOT_COLS; i++) {
      const rows: string[] = [];

      for (let j = 0; j < SLOT_ROWS; j++) {
        // Can use an external library such as Random JS
        // We are using the native JavaScript way of generating pseudo-random values
        const randomIndex = rand(SLOT_SYMBOLS.length);
        const randomSymbol = SLOT_SYMBOLS[randomIndex];
        rows.push(randomSymbol);
      }

      matrix.push(rows);
    }

    return matrix;
  }
}
