import { RtpService } from "@api/rtp";
import { AppError } from "@core/AppError";
import { rtpApi } from "@lib/axios";
import { ROUTES } from "@lib/constants";

jest.mock("@lib/axios");

describe("RTP Service", () => {
  let rtpService: RtpService;

  beforeEach(() => {
    rtpService = new RtpService(rtpApi);
  });

  afterEach(() => {
    jest.clearAllMocks();
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
        { amount: null, description: "'amount' is missing" },
      ];

      invalidInputs.forEach(({ amount, description }) => {
        it(`should throw a 400 if ${description}`, async () => {
          if (typeof amount === "number") {
            await expect(() => rtpService.recordBet(amount)).rejects.toThrow(
              AppError.BadRequest(
                "Record Bet Error: Amount must be a positive number"
              )
            );
          } else {
            await expect(() => rtpService.recordBet(amount)).rejects.toThrow(
              AppError.BadRequest(
                `Record Bet Error: Amount must be of type 'number'. Provided ${typeof amount}`
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
        it(`should record a bet and respond with 200 if ${description}`, async () => {
          (rtpApi.post as jest.Mock).mockResolvedValue({
            status: 200,
            data: "OK",
          });

          const result = await rtpService.recordBet(amount);

          expect(rtpApi.post).toHaveBeenCalledWith(ROUTES.RTP, {
            amount,
            type: "bet",
          });
          expect(result.status).toBe(200);
          expect(result.data).toBe("OK");
        });
      });
    });
  });

  describe("recordWinning method", () => {
    describe("Invalid Inputs", () => {
      const invalidInputs: { amount: any; description: string }[] = [
        { amount: "123", description: "'amount' is a string" },
        { amount: -123, description: "'amount' is a negative integer" },
        { amount: -123.4, description: "'amount' is a negative decimal" },
        { amount: true, description: "'amount' is a boolean" },
        { amount: {}, description: "'amount' is an object" },
        { amount: undefined, description: "'amount' is missing" },
        { amount: null, description: "'amount' is missing" },
      ];

      invalidInputs.forEach(({ amount, description }) => {
        it(`should throw a 400 if ${description}`, async () => {
          if (typeof amount === "number") {
            await expect(() =>
              rtpService.recordWinning(amount)
            ).rejects.toThrow(
              AppError.BadRequest(
                "Record Winning Error: Amount must be a positive number"
              )
            );
          } else {
            await expect(() =>
              rtpService.recordWinning(amount)
            ).rejects.toThrow(
              AppError.BadRequest(
                `Record Winning Error: Amount must be of type 'number'. Provided ${typeof amount}`
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
        it(`should record a winning and respond with 200 if ${description}`, async () => {
          (rtpApi.post as jest.Mock).mockResolvedValue({
            status: 200,
            data: "OK",
          });

          const result = await rtpService.recordWinning(amount);

          expect(rtpApi.post).toHaveBeenCalledWith(ROUTES.RTP, {
            amount,
            type: "winning",
          });
          expect(result.status).toBe(200);
          expect(result.data).toBe("OK");
        });
      });
    });
  });
});
