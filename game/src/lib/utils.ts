import { MersenneTwister19937, Random } from "random-js";
import { SLOT_COLS, SLOT_ROWS, SLOT_SYMBOLS } from "./constants";

export function rand() {
  const engine = MersenneTwister19937.autoSeed();
  return new Random(engine);
}

export function generateRandomMatrix() {
  const matrix = [];

  for (let i = 0; i < SLOT_COLS; i++) {
    const row = [];

    for (let j = 0; j < SLOT_ROWS; j++) {
      const randomIndex = rand().integer(0, SLOT_SYMBOLS.length - 1);
      row.push(SLOT_SYMBOLS[randomIndex]!);
    }

    matrix.push(row);
  }

  return matrix;
}

export function calculateWinnings(matrix: string[][], bet: number) {
  let winnings = 0;
  for (let i = 0; i < 3; i++) {
    if (matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2]) {
      winnings += bet * 5; // Winning rule: 3 identical symbols in a row
    }
  }
  return winnings;
}
