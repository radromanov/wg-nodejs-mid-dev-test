import { RtpService } from "@api/rtp";
import { AppError } from "@core/AppError";
import { BET_MULTIPLIER } from "@lib/constants";

describe("RTP Service", () => {
  let rtpService: RtpService;
  let startingBets: number;
  let startingWinnings: number;

  beforeEach(() => {
    rtpService = new RtpService();
    startingBets = rtpService.totalBets;
    startingWinnings = rtpService.totalWinnings;
  });

  describe("Method Validation", () => {
    const availableMethods = ["calculateRtp", "recordBet", "recordWinning"];

    availableMethods.forEach((method) => {
      it(`should contain ${method}`, () => {
        expect(rtpService).toHaveProperty(method);
      });
    });
  });

  describe("recordBet method", () => {
    describe("Invalid Inputs", () => {
      const invalidInputs: { amount: any; description: string }[] = [
        { amount: "123", description: "'amount' is a string" },
        { amount: -123, description: "'amount' is a negative integer" },
        { amount: -123.4, description: "'amount' is a negative decimal" },
        { amount: true, description: "'amount' is a boolean" },
        { amount: {}, description: "'amount' is an object" },
        { amount: undefined, description: "'amount' is missing" },
      ];

      invalidInputs.forEach(({ amount, description }) => {
        it(`should throw a 400 if ${description}`, () => {
          if (typeof amount === "number") {
            expect(() => rtpService.recordBet(amount)).toThrow(
              AppError.BadRequest("Amount must be a positive number")
            );
          } else {
            expect(() => rtpService.recordBet(amount)).toThrow(
              AppError.BadRequest(
                `Amount must be of type 'number'. Provided ${typeof amount}`
              )
            );
          }
        });
      });
    });

    describe("Valid Inputs", () => {
      const validInputs: { amount: any; description: string }[] = [
        { amount: 123, description: "'amount' is a positive integer" },
        { amount: 123.4, description: "'amount' is a positive decimal" },
      ];

      validInputs.forEach(({ amount, description }) => {
        it(`should successfully increment 'totalBets' if ${description}`, () => {
          rtpService.recordBet(amount);
          const currentTotalBets = rtpService.totalBets;

          expect(currentTotalBets).toBe(startingBets + amount);
        });
      });
    });
  });

  describe("recordWinning method", () => {
    describe("Invalid Inputs", () => {
      const invalidInputs: { amount: any; description: string }[] = [
        { amount: "123", description: "'amount' is a string" },
        { amount: "123.3", description: "'amount' is a string decimal" },
        { amount: -123, description: "'amount' is a negative integer" },
        { amount: -123.4, description: "'amount' is a negative decimal" },
        { amount: true, description: "'amount' is a boolean" },
        { amount: {}, description: "'amount' is an object" },
        { amount: undefined, description: "'amount' is missing" },
      ];

      invalidInputs.forEach(({ amount, description }) => {
        it(`should throw a 400 if ${description}`, () => {
          if (typeof amount === "number") {
            expect(() => rtpService.recordWinning(amount)).toThrow(
              AppError.BadRequest("Amount must be a positive number")
            );
          } else {
            expect(() => rtpService.recordWinning(amount)).toThrow(
              AppError.BadRequest(
                `Amount must be of type 'number'. Provided ${typeof amount}`
              )
            );
          }
        });
      });
    });

    describe("Valid Inputs", () => {
      const validInputs: { amount: any; description: string }[] = [
        { amount: 123, description: "'amount' is a positive integer" },
        { amount: 123.4, description: "'amount' is a positive decimal" },
        { amount: 123.4, description: "'amount' is a positive decimal" },
      ];

      validInputs.forEach(({ amount, description }) => {
        it(`should successfully increment 'totalWinnings' if ${description}`, () => {
          rtpService.recordWinning(amount);
          const currentTotalWinnings = rtpService.totalWinnings;

          expect(currentTotalWinnings).toBe(startingWinnings + amount);
        });
      });
    });
  });

  describe("calculateRtp method", () => {
    let bet: number;
    let winning: number;

    beforeAll(() => {
      bet = 250;
      winning = bet * BET_MULTIPLIER;
    });

    it("should return the correct return-to-player percentage", () => {
      rtpService.recordBet(bet);
      rtpService.recordWinning(winning);

      const rtp = rtpService.calculateRtp();

      expect(rtp).toBe((rtpService.totalWinnings / rtpService.totalBets) * 100);
    });

    it("should return 0", () => {
      const rtp = rtpService.calculateRtp();

      expect(rtp).toBe(0);
    });
  });
});
