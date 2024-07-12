import { WalletService } from "@api/wallet";
import { walletApi } from "@lib/axios";
import { ROUTES } from "@lib/constants";

jest.mock("@lib/axios");

describe("Wallet Service", () => {
  let walletService: WalletService;
  const amount = 100.5;

  beforeEach(() => {
    walletService = new WalletService(walletApi);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should deposit and return a 200", async () => {
    (walletApi.post as jest.Mock).mockResolvedValue({
      status: 200,
      data: "OK",
    });

    const result = await walletService.deposit(amount);

    expect(walletApi.post).toHaveBeenCalledWith(ROUTES.WALLET.DEPOSIT, {
      amount,
    });
    expect(result.status).toBe(200);
    expect(result.data).toBe("OK");
  });

  it("should withdraw and return a 200", async () => {
    (walletApi.post as jest.Mock).mockResolvedValue({
      status: 200,
      data: "OK",
    });

    const result = await walletService.withdraw(amount);

    expect(walletApi.post).toHaveBeenCalledWith(ROUTES.WALLET.WITHDRAW, {
      amount,
    });
    expect(result.status).toBe(200);
    expect(result.data).toBe("OK");
  });
});
