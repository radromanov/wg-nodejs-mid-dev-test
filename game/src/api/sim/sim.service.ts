import { AppError } from "@core/AppError";
import { PlayService } from "../play/play.service";
import { isDecimal } from "@lib/utils";

export class SimService {
  constructor(private readonly playService: PlayService) {}

  async simulate(count: number, bet: number) {
    if (!count) {
      throw AppError.BadRequest(
        `Simulation Error: Missing 'count' argument. Please ensure you're providing 'count' and 'bet' arguments`
      );
    }
    if (!bet) {
      throw AppError.BadRequest(
        `Simulation Error: Missing 'bet' argument. Please ensure you're providing 'count' and 'bet' arguments`
      );
    }

    if (typeof count !== "number") {
      throw AppError.BadRequest(
        `Simulation Error: Count must be of type 'number'. Provided ${typeof count}`
      );
    }
    if (typeof bet !== "number") {
      throw AppError.BadRequest(
        `Simulation Error: Bet must be of type 'number'. Provided ${typeof count}`
      );
    }

    if (count <= 0) {
      throw AppError.BadRequest(
        `Simulation Error: Count must be a positive integer`
      );
    }

    if (isDecimal(count)) {
      throw AppError.BadRequest(
        `Simulation Error: Count must be a positive integer. Provided decimal`
      );
    }

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
