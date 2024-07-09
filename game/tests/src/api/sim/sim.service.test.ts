import { PlayService, SimService } from "../../../../src/api";

describe("Simulation Service", () => {
  let simService: SimService;
  const bet = 100;
  const spins = 5;
  const wallet = 1000;

  beforeAll(() => {
    let playService = new PlayService(wallet);
    simService = new SimService(playService);
  });

  it("should simulate X amount of playService.play() calls", () => {
    const { totalWinnings, netResult } = simService.simulate(spins, bet);
    const totalBet = bet * spins;

    expect(netResult).toBe(totalWinnings - totalBet);
  });
});
