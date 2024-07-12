import { PlayService } from "@api/play";
import { SLOT_COLS, SLOT_ROWS } from "@lib/constants";

describe("Play Service", () => {
  let playService: PlayService;
  let symbols: string[];
  let result: { matrix: string[][]; winnings: number };
  const bet = 100;

  beforeEach(() => {
    playService = new PlayService();
    symbols = playService.spin();
  });

  it("should have the necessary methods", () => {
    expect(playService).toHaveProperty("play");
    expect(playService).toHaveProperty("spin");
  });

  it("should generate an array of symbols with the correct length", () => {
    expect(Array.isArray(symbols)).toBe(true);
    expect(symbols.length).toBe(SLOT_COLS);
  });

  describe("play method", () => {
    beforeEach(async () => {
      result = await playService.play(bet, symbols);
    });

    it("should return an object with 'matrix' and 'winnings'", () => {
      expect(result).toHaveProperty("matrix");
      expect(result).toHaveProperty("winnings");
    });

    it("should have 'matrix' as a 2D array of correct dimensions", () => {
      expect(Array.isArray(result.matrix)).toBe(true);
      expect(result.matrix.length).toBe(SLOT_COLS);
      result.matrix.forEach((column) => {
        expect(Array.isArray(column)).toBe(true);
        expect(column.length).toBe(SLOT_ROWS);
      });
    });

    it("should have 'winnings' as a number", () => {
      expect(typeof result.winnings).toBe("number");
    });
  });
});
