import {
  BET_MULTIPLIER,
  SLOT_COLS,
  SLOT_ROWS,
  SLOT_SYMBOLS,
} from "@lib/constants";
import { allEqual, rand } from "@lib/utils";

export class PlayService {
  private matrix: string[][];

  constructor() {
    this.matrix = this.generateMatrix();
  }

  async play(bet: number) {
    const symbols = this.spin();
    const winnings = this.calculateWinnings(symbols, bet);

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

    return symbols;
  }

  private calculateWinnings(symbols: string[], bet: number) {
    const winnings = allEqual(symbols) ? bet * BET_MULTIPLIER : 0;
    return winnings;
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
