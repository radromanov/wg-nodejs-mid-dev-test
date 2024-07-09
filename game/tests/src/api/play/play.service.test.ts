import { PlayService } from "../../../../src/api/play/play.service";
import { BET_MULTIPLIER, TOTAL_SLOTS } from "../../../../src/lib";

describe("Play Service", () => {
  let playService: PlayService;
  let bet: number;

  beforeAll(() => {
    playService = new PlayService();
    bet = 100;
  });

  it("should contain methods", () => {
    expect(playService).toHaveProperty("spin");
    expect(playService).toHaveProperty("calculateWinnings");
  });

  it("should return a spin", () => {
    const spin = playService.spin();

    expect(spin.length).toBe(TOTAL_SLOTS);
  });

  it("should return multiplied bet", () => {
    const spin = ["A", "A", "A"]; // Suppose the user has won (3 of the same kind in a row)

    const winnings = playService.calculateWinnings(spin, bet);

    expect(winnings).toBe(bet * BET_MULTIPLIER);
  });
});
