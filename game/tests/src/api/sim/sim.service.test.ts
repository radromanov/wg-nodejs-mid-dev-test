import { PlayService } from "@api/play";
import { SimService } from "@api/sim";

describe("Simulation Service", () => {
  let simService: SimService;
  let playService: PlayService;
  const bet = 100;
  const spins = 5;

  beforeEach(() => {
    playService = new PlayService();
    simService = new SimService(playService);
  });

  it("should simulate multiple playService.play() calls and calculate net result correctly", async () => {
    // Mock the PlayService methods
    const mockSpin = jest
      .spyOn(playService, "spin")
      .mockImplementation(() => ["A", "B", "C"]);
    const mockPlay = jest
      .spyOn(playService, "play")
      .mockImplementation(async () => ({
        matrix: [
          ["A", "B", "C"],
          ["A", "B", "C"],
          ["A", "B", "C"],
        ],
        winnings: 50,
      }));

    const totalWinnings = await simService.simulate(spins, bet);
    const totalBet = bet * spins;
    const netResult = totalWinnings - totalBet;

    expect(mockSpin).toHaveBeenCalledTimes(spins);
    expect(mockPlay).toHaveBeenCalledTimes(spins);
    expect(totalWinnings).toBe(50 * spins); // Each play() call returns 50 winnings
    expect(netResult).toBe(50 * spins - totalBet);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
