import { PlayService } from "@api/play";
import { SLOT_COLS, SLOT_ROWS, TOTAL_SLOTS } from "@lib/constants";

describe("Play Service", () => {
  let playService: PlayService;
  const bet = 100;

  beforeEach(() => {
    playService = new PlayService();
  });

  it("should contain methods", () => {
    expect(playService).toHaveProperty("play");
    expect(playService).toHaveProperty("spin");
  });

  it("should return an array of symbols", () => {
    const symbols = playService.spin();

    expect(Array.isArray(symbols)).toBeTruthy();
    expect(symbols.length).toBe(TOTAL_SLOTS);
  });

  it("should return a matrix and winnings", async () => {
    const symbols = playService.spin();
    const result = await playService.play(bet, symbols);

    expect(result).toHaveProperty("matrix");
    expect(result).toHaveProperty("winnings");
  });

  it("should return matrix in the correct format", async () => {
    const symbols = playService.spin();
    const result = await playService.play(bet, symbols);

    expect(result.matrix.length).toBe(SLOT_COLS);
    result.matrix.forEach((column) => {
      expect(column.length).toBe(SLOT_ROWS);
    });
  });
});
