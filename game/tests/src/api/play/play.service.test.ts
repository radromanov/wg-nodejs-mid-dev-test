import { PlayService } from "@api/play";
import { SLOT_COLS, SLOT_ROWS, TOTAL_SLOTS } from "@lib/constants";

describe("Play Service", () => {
  let playService: PlayService;
  let symbols: string[];
  let result: { matrix: string[][]; winnings: number };
  const bet = 100;

  beforeEach(async () => {
    playService = new PlayService();
    symbols = playService.spin();
    result = await playService.play(bet, symbols);
  });

  it("should contain methods", () => {
    expect(playService).toHaveProperty("play");
    expect(playService).toHaveProperty("spin");
  });

  it("should be an array symbols", () => {
    expect(Array.isArray(symbols)).toBeTruthy();
    expect(symbols.length).toBe(TOTAL_SLOTS);
  });

  it("should contain matrix and winnings in the correct format", async () => {
    expect(result).toHaveProperty("matrix");
    expect(result).toHaveProperty("winnings");

    expect(Array.isArray(result.matrix)).toBeTruthy();
    expect(typeof result.winnings === "number").toBeTruthy();

    expect(result.matrix.length).toBe(SLOT_COLS);
    result.matrix.forEach((column) => {
      expect(column.length).toBe(SLOT_ROWS);
    });
  });
});
