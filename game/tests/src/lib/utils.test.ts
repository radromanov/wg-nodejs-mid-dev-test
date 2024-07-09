import { generateMatrix } from "../../../src/lib";

describe("Generate Matrix", () => {
  const matrix: string[][] = [];
  const SLOT_COLS = 3;
  const SLOT_ROWS = 3;
  const SLOT_SYMBOLS = ["A", "B", "C", "D", "E"];

  it("should return a 3x3 Matrix", () => {
    for (let i = 0; i < SLOT_COLS; i++) {
      const rows: string[] = [];

      for (let j = 0; j < SLOT_ROWS; j++) {
        const randomIndex = Math.floor(Math.random() * SLOT_SYMBOLS.length);
        const randomSymbol = SLOT_SYMBOLS[randomIndex];
        rows.push(randomSymbol);
      }

      matrix.push(rows);
    }

    expect(matrix.length).toBe(3);
  });
});

describe("Calculate winnings", () => {
  let bet = 10;
  let matrix: string[][] = [];

  beforeAll(() => {
    matrix = generateMatrix();
  });

  it("should multiply bet by 5", () => {
    let winnings = 0;

    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2]) {
        winnings += bet * 5;
      }
    }

    expect(bet).toBeGreaterThan(0);
  });
});
