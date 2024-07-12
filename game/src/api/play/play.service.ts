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

  async play(bet: number, symbols: string[]) {
    const winnings = this.calculateWinnings(symbols, bet);
    return { matrix: this.matrix, winnings };
  }

  spin() {
    return this.matrix.map((column) => column[rand(column.length)]);
  }

  private calculateWinnings(symbols: string[], bet: number) {
    return allEqual(symbols) ? bet * BET_MULTIPLIER : 0;
  }

  private generateMatrix() {
    return Array.from({ length: SLOT_COLS }, () =>
      Array.from(
        { length: SLOT_ROWS },
        () => SLOT_SYMBOLS[rand(SLOT_SYMBOLS.length)]
      )
    );
  }
}
