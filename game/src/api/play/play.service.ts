/**
 * 
 * - [ ] **Functionality:**
  - [ ] Deduct the bet amount from the player's wallet.
  - [ ] Perform a random spin using the RNG.
  - [ ] Calculate the winnings based on the final symbol matrix.
  - [ ] Update the player's wallet with the winnings.
  - [ ] Return the final symbol matrix and winnings.
 * 
 * 
 */

import {
  BET_MULTIPLIER,
  SLOT_COLS,
  SLOT_ROWS,
  SLOT_SYMBOLS,
  allEqual,
  rand,
} from "../../lib";

export class PlayService {
  matrix: string[][];

  constructor() {
    this.matrix = this.generateMatrix();
  }

  spin() {
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
  calculateWinnings(symbols: string[], bet: number) {
    let winnings = 0;
    const isWinning = allEqual(symbols);

    if (isWinning) {
      winnings += bet * BET_MULTIPLIER;
    }

    return winnings;
  }

  deductBet() {}
  updateWallet() {}

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
