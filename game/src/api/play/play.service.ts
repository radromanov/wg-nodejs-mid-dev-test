import { AppError } from "@shared/errors/AppError";
import {
  BET_MULTIPLIER,
  SLOT_COLS,
  SLOT_ROWS,
  SLOT_SYMBOLS,
} from "@lib/constants";
import { allEqual, allOfType, rand } from "@lib/utils";

export class PlayService {
  private matrix: string[][];

  constructor() {
    this.matrix = this.generateMatrix();
  }

  async play(bet: number, symbols: string[]) {
    if (!Array.isArray(symbols)) {
      throw AppError.BadRequest(
        `Play Error: Symbols must be an array. Provided ${typeof symbols}`
      );
    }

    if (!symbols.length) {
      throw AppError.BadRequest(
        `Play Error: Symbols must be a non-empty array`
      );
    }

    // Invalid array type
    if (!allOfType(symbols, "string")) {
      throw AppError.BadRequest(
        `Play Error: Symbols must be a non-empty array`
      );
    }

    if (typeof bet !== "number") {
      throw AppError.BadRequest(
        `Play Error: Bet must be of type 'number'. Provided ${typeof bet}`
      );
    }
    if (bet <= 0 || !bet) {
      throw AppError.BadRequest("Play Error: Amount must be a positive number");
    }

    const winnings = this.calculateWinnings(symbols, bet);
    return { matrix: this.matrix, winnings };
  }

  spin() {
    return this.matrix.map((column) => column[rand(0, column.length)]);
  }

  private calculateWinnings(symbols: string[], bet: number) {
    if (!Array.isArray(symbols)) {
      throw AppError.BadRequest(
        `CalculateWinnings Error: Symbols must be an array. Provided ${typeof symbols}`
      );
    }

    if (!symbols.length) {
      throw AppError.BadRequest(
        `CalculateWinnings Error: Symbols must be a non-empty array`
      );
    }

    // Invalid array type
    if (!allOfType(symbols, "string")) {
      throw AppError.BadRequest(
        `CalculateWinnings Error: Symbols must be a non-empty array`
      );
    }

    if (typeof bet !== "number") {
      throw AppError.BadRequest(
        `CalculateWinnings Error: Bet must be of type 'number'. Provided ${typeof bet}`
      );
    }
    if (bet <= 0 || !bet) {
      throw AppError.BadRequest(
        "CalculateWinnings Error: Amount must be a positive number"
      );
    }

    const isWin = allEqual(symbols);

    if (isWin) {
      console.log("You won!", symbols);
      return bet * BET_MULTIPLIER;
    } else {
      console.log("You lose, but maybe next time.", symbols);
      return 0;
    }
  }

  private generateMatrix() {
    return Array.from({ length: SLOT_COLS }, () =>
      Array.from(
        { length: SLOT_ROWS },
        () => SLOT_SYMBOLS[rand(0, SLOT_SYMBOLS.length)]
      )
    );
  }
}
