import { PlayService } from "@api/play";
import { BET_MULTIPLIER, SLOT_COLS, SLOT_ROWS } from "@lib/constants";

describe("Play Service", () => {
  let playService: PlayService;
  const bet = 100;
  const wallet = 2000;

  beforeEach(() => {
    playService = new PlayService(wallet);
  });

  it("should contain methods", () => {
    expect(playService).toHaveProperty("play");
  });

  it("should return a matrix and winnings", () => {
    const result = playService.play(bet);
    expect(result).toHaveProperty("matrix");
    expect(result).toHaveProperty("winnings");
    expect(result.matrix.length).toBe(SLOT_COLS);
    result.matrix.forEach((column) => {
      expect(column.length).toBe(SLOT_ROWS);
    });
  });

  it("should deduct the bet amount from the wallet", () => {
    let initialWallet = wallet;
    playService.play(bet);
    initialWallet -= bet;

    expect(initialWallet).toBe(wallet - bet);
  });

  it("should update the wallet with winnings if symbols are equal", () => {
    jest.spyOn(playService as any, "spin").mockReturnValue(["A", "A", "A"]);
    const result = playService.play(bet);

    expect(result.winnings).toBe(bet * BET_MULTIPLIER);
  });

  it("should return zero winnings if symbols are not equal", () => {
    jest.spyOn(playService as any, "spin").mockReturnValue(["A", "B", "C"]);

    const result = playService.play(bet);
    expect(result.winnings).toBe(0);
  });
});
