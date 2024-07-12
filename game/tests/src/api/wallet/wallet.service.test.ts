import { WalletService } from "@api/wallet";
import { walletApi } from "@lib/axios";

describe("Wallet Service", () => {
  let walletService: WalletService;
  let amount: number;

  beforeAll(() => {
    amount = 100.5;
  });
  beforeEach(() => {
    walletService = new WalletService(walletApi);
  });

  it("should deposit and return a 200", async () => {
    const result = await walletService.deposit(amount);

    expect(result.status).toBe(200);
    expect(result.data).toBe("OK");
  });

  it("should withdraw and return a 200", async () => {
    const result = await walletService.withdraw(amount);

    expect(result.status).toBe(200);
    expect(result.data).toBe("OK");
  });
});
