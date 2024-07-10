import { PlayService } from "@api/play";
import { SimService } from "@api/sim";

describe("Simulation Service", () => {
  let simService: SimService;
  const bet = 100;
  const spins = 5;
  const wallet = 1000;

  beforeEach(() => {
    let playService = new PlayService(wallet);
    simService = new SimService(playService);
  });

  it("should simulate X amount of playService.play() calls", () => {
    const { totalWinnings, netResult } = simService.simulate(spins, bet);
    const totalBet = bet * spins;

    expect(netResult).toBe(totalWinnings - totalBet);
  });
});
