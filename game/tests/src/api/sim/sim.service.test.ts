import { PlayService } from "@api/play";
import { SimService } from "@api/sim";

describe("Simulation Service", () => {
  let simService: SimService;
  const bet = 100;
  const spins = 5;

  beforeEach(() => {
    let playService = new PlayService();
    simService = new SimService(playService);
  });

  it("should simulate X amount of playService.play() calls", async () => {
    const totalWinnings = await simService.simulate(spins, bet);
    const totalBet = bet * spins;
    const netResult = totalWinnings - totalBet;

    expect(netResult).toBe(totalWinnings - totalBet);
  });
});
