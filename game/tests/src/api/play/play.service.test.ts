import { PlayService } from "@api/play";
import {
  BET_MULTIPLIER,
  SLOT_COLS,
  SLOT_ROWS,
  SLOT_SYMBOLS,
} from "@lib/constants";
import { allEqual } from "@lib/utils";

describe("Play Service", () => {
  let playService: PlayService;

  beforeEach(() => {
    playService = new PlayService();
  });

  describe("Method Validation", () => {
    const availableMethods = ["play", "spin"];

    availableMethods.forEach((method) => {
      it(`should contain ${method} method`, () => {
        expect(playService).toHaveProperty(method);
      });
    });
  });

  describe("spin method", () => {
    let symbols: string[];

    beforeAll(() => {
      symbols = playService.spin();
    });

    it("should return an array of symbols with the correct length", () => {
      expect(Array.isArray(symbols)).toBe(true);
      expect(symbols.length).toBe(SLOT_COLS);
    });

    it("should return symbols from the predefined SLOT_SYMBOLS", () => {
      symbols.forEach((symbol) => {
        expect(SLOT_SYMBOLS).toContain(symbol);
      });
    });
  });

  describe("play method", () => {
    const bet = 100;

    describe("Invalid Inputs", () => {
      const symbols = ["A", "A", "A"];
      const invalidInputs: { bet: any; symbols: any; description: string }[] = [
        { bet: "123", symbols, description: "'bet' is a string" },
        { bet: -123, symbols, description: "'bet' is a negative integer" },
        { bet: -123.4, symbols, description: "'bet' is a negative decimal" },
        { bet: true, symbols, description: "'bet' is a boolean" },
        { bet: {}, symbols, description: "'bet' is an object" },
        { bet: undefined, symbols, description: "'bet' is missing" },
        { bet: null, symbols, description: "'bet' is missing" },
        { bet, symbols: [], description: "'symbols' is empty" },
        { bet, symbols: undefined, description: "'symbols' is missing" },
        { bet, symbols: null, description: "'symbols' is missing" },
        { bet, symbols: "array", description: "'symbols' is a string" },
        { bet, symbols: 123, description: "'symbols' is a number" },
        { bet, symbols: true, description: "'symbols' is a boolean" },
        {
          bet,
          symbols: [1, "A", "A"],
          description: "'symbols' contains non-string values",
        },
      ];

      invalidInputs.forEach(({ bet, symbols, description }) => {
        it(`should throw a 400 if ${description}`, async () => {
          await expect(() => playService.play(bet, symbols)).rejects.toThrow(
            expect.objectContaining({
              status: 400,
            })
          );
        });
      });
    });

    describe("Valid Inputs", () => {
      const symbols = ["A", "A", "A"];

      const validInputs: { bet: any; symbols: any; description: string }[] = [
        {
          bet,
          symbols,
          description:
            "'bet' is a positive integer and 'symbols' is an array of strings",
        },
        {
          bet: 123.4,
          symbols,
          description:
            "'bet' is a positive decimal and 'symbols' is an array of strings",
        },
      ];

      validInputs.forEach(({ bet, symbols, description }) => {
        it(`should return an object containing 'matrix' and 'winnings' if ${description}`, async () => {
          const result = await playService.play(bet, symbols);

          expect(result).toHaveProperty("matrix");
          expect(result).toHaveProperty("winnings");
        });

        it(`should return 'matrix' with the correct dimensions and 'winnings' as a type 'number' if ${description}`, async () => {
          const result = await playService.play(bet, symbols);

          expect(Array.isArray(result.matrix)).toBe(true);
          expect(result.matrix.length).toBe(SLOT_COLS);
          result.matrix.forEach((column) => {
            expect(Array.isArray(column)).toBe(true);
            expect(column.length).toBe(SLOT_ROWS);
          });
          expect(typeof result.winnings).toBe("number");
        });
      });
    });
  });

  describe("generateMatrix method", () => {
    let matrix: string[][];

    beforeAll(() => {
      matrix = playService["generateMatrix"](); // Accessing private method for testing
    });

    it("should generate a matrix of correct dimensions", () => {
      expect(matrix.length).toBe(SLOT_COLS);
      matrix.forEach((column) => {
        expect(column.length).toBe(SLOT_ROWS);
      });
    });

    it("should generate a matrix with valid symbols", () => {
      matrix.forEach((column) => {
        column.forEach((symbol) => {
          expect(SLOT_SYMBOLS).toContain(symbol);
        });
      });
    });
  });

  describe("calculateWinnings method", () => {
    const bet = 123;
    describe("Invalid Inputs", () => {
      const symbols = ["A", "A", "A"];
      const invalidInputs: { bet: any; symbols: any; description: string }[] = [
        { bet: "123", symbols, description: "'bet' is a string" },
        { bet: -123, symbols, description: "'bet' is a negative integer" },
        { bet: -123.4, symbols, description: "'bet' is a negative decimal" },
        { bet: true, symbols, description: "'bet' is a boolean" },
        { bet: {}, symbols, description: "'bet' is an object" },
        { bet: undefined, symbols, description: "'bet' is missing" },
        { bet: null, symbols, description: "'bet' is missing" },
        { bet, symbols: [], description: "'symbols' is empty" },
        { bet, symbols: undefined, description: "'symbols' is missing" },
        { bet, symbols: null, description: "'symbols' is missing" },
        { bet, symbols: "array", description: "'symbols' is a string" },
        { bet, symbols: 123, description: "'symbols' is a number" },
        { bet, symbols: true, description: "'symbols' is a boolean" },
        {
          bet,
          symbols: [1, "A", "A"],
          description: "'symbols' contains non-string values",
        },
      ];

      invalidInputs.forEach(({ bet, symbols, description }) => {
        it(`should throw a 400 if ${description}`, () => {
          expect(() => playService["calculateWinnings"](bet, symbols)).toThrow(
            expect.objectContaining({
              status: 400,
            })
          );
        });
      });
    });

    describe("Valid Inputs", () => {
      const equalSymbols = ["A", "A", "A"];
      const unequalSymbols = ["A", "A", "B"];

      const validInputs: { bet: any; symbols: any; description: string }[] = [
        {
          bet,
          symbols: equalSymbols,
          description:
            "'bet' is a positive integer and 'symbols' is a string array of all equal symbols",
        },
        {
          bet: 123.4,
          symbols: unequalSymbols,
          description:
            "'bet' is a positive decimal and 'symbols' is a string array of non-equal symbols",
        },
      ];

      validInputs.forEach(({ bet, symbols, description }) => {
        if (allEqual(symbols)) {
          it(`should return correct winnings if ${description}`, () => {
            const winnings = playService["calculateWinnings"](symbols, bet); // Accessing private method for testing
            expect(winnings).toBe(bet * BET_MULTIPLIER);
          });
        } else {
          it(`should return zero winnings if ${description}`, () => {
            const winnings = playService["calculateWinnings"](symbols, bet);
            expect(winnings).toBe(0);
          });
        }
      });
    });
  });
});
