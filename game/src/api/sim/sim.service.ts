import { PlayService } from "../play/play.service";

export class SimService {
  constructor(private readonly playService: PlayService) {}

  async simulate(count: number, bet: number) {
    let totalWinnings = 0;

    for (let i = 0; i < count; i++) {
      const symbols = this.playService.spin();
      const { winnings } = await this.playService.play(bet, symbols);

      if (winnings) {
        totalWinnings += winnings;
      }
    }

    return totalWinnings;
  }
}
