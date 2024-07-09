import { PlayService } from "../play/play.service";

export class SimService {
  constructor(private readonly playService: PlayService) {}

  simulate(count: number, bet: number) {
    let totalWinnings = 0;
    const totalBet = bet * count;

    for (let i = 0; i < count; i++) {
      const { winnings } = this.playService.play(bet);

      if (winnings) {
        totalWinnings += winnings;
      }
    }

    const netResult = totalWinnings - totalBet;

    return { totalWinnings, netResult };
  }
}
