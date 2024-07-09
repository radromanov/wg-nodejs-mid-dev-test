import { SLOT_COLS, SLOT_ROWS, SLOT_SYMBOLS } from "./constants";

export function generateMatrix() {
  const matrix: string[][] = [];
  for (let i = 0; i < SLOT_COLS; i++) {
    const rows: string[] = [];

    for (let j = 0; j < SLOT_ROWS; j++) {
      // Can use an external library such as Random JS
      // We are using the native JavaScript way of generating pseudo-random values
      const randomIndex = Math.floor(Math.random() * SLOT_SYMBOLS.length);
      const randomSymbol = SLOT_SYMBOLS[randomIndex];
      rows.push(randomSymbol);
    }

    matrix.push(rows);
  }

  return matrix;
}

export function calculateWinnings(matrix: string[][], bet: number) {
  let winnings = 0;

  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2]) {
      winnings += bet * 5; // Multiply by 5 if 3 of the same symbol
    }
  }

  return winnings;
}
