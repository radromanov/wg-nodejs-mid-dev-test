import { WalletService } from "@api/wallet";

describe("Wallet Service", () => {
  let walletService: WalletService;
  let initialWallet = 2000;
  const withdrawAmount = 100;
  const depositAmount = 100;

  beforeEach(() => {
    walletService = new WalletService(initialWallet);
  });

  it("should withdraw and return new balance", () => {
    walletService.withdraw(withdrawAmount);
    const currentBalance = walletService.getCurrentBalance();

    expect(currentBalance).toBe(initialWallet - withdrawAmount);
  });

  it("should deposit and return new balance", () => {
    walletService.deposit(depositAmount);
    const currentBalance = walletService.getCurrentBalance();

    expect(currentBalance).toBe(initialWallet + depositAmount);
  });

  it("should return the current balance", () => {
    const currentBalance = walletService.getCurrentBalance();

    expect(currentBalance).toBe(initialWallet);
  });

  it("should withdraw an excessive amount", () => {
    expect(() => walletService.withdraw(initialWallet + 1)).toThrow(
      `You do not have sufficient funds to withdraw ${initialWallet + 1}`
    );
  });
});
