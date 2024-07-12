import { RtpService } from "@api/rtp";
import { rtpApi } from "@lib/axios";

describe("RTP Service", () => {
  let rtpService: RtpService;
  let amount: number;

  beforeAll(() => {
    amount = 100.5;
  });
  beforeEach(() => {
    rtpService = new RtpService(rtpApi);
  });

  it("should record a bet and respond with 200", async () => {
    const result = await rtpService.recordBet(amount);

    expect(result.status).toBe(200);
    expect(result.data).toBe("OK");
  });

  it("should record a winning and respond with 200", async () => {
    const result = await rtpService.recordWinning(amount);

    expect(result.status).toBe(200);
    expect(result.data).toBe("OK");
  });
});
