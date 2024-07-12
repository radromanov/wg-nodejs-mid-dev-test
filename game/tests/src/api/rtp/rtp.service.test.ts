import { RtpService } from "@api/rtp";
import { rtpApi } from "@lib/axios";
import { ROUTES } from "@lib/constants";

jest.mock("@lib/axios");

describe("RTP Service", () => {
  let rtpService: RtpService;
  const amount = 100.5;

  beforeEach(() => {
    rtpService = new RtpService(rtpApi);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should record a bet and respond with 200", async () => {
    (rtpApi.post as jest.Mock).mockResolvedValue({ status: 200, data: "OK" });

    const result = await rtpService.recordBet(amount);

    expect(rtpApi.post).toHaveBeenCalledWith(ROUTES.RTP, {
      amount,
      type: "bet",
    });
    expect(result.status).toBe(200);
    expect(result.data).toBe("OK");
  });

  it("should record a winning and respond with 200", async () => {
    (rtpApi.post as jest.Mock).mockResolvedValue({ status: 200, data: "OK" });

    const result = await rtpService.recordWinning(amount);

    expect(rtpApi.post).toHaveBeenCalledWith(ROUTES.RTP, {
      amount,
      type: "winning",
    });
    expect(result.status).toBe(200);
    expect(result.data).toBe("OK");
  });
});
