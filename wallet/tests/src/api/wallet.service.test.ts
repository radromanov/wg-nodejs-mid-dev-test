import { WalletService } from "@api/wallet";

describe("Wallet Service", () => {
  let walletService: WalletService;
  let initialWallet = 2000;

  beforeEach(() => {
    walletService = new WalletService(initialWallet);
  });

  describe("Withdraw", () => {
    const withdrawAmount = 100;

    it("should withdraw and return new balance", () => {
      walletService.withdraw(withdrawAmount);
      const currentBalance = walletService.getCurrentBalance();

      expect(currentBalance).toBe(initialWallet - withdrawAmount);
    });

    it("should withdraw an excessive amount", () => {
      expect(() => walletService.withdraw(initialWallet + 1)).toThrow(
        `You do not have sufficient funds to withdraw ${initialWallet + 1}`
      );
    });
  });

  describe("Deposit", () => {
    const depositAmount = 100;

    it("should deposit and return new balance", () => {
      walletService.deposit(depositAmount);
      const currentBalance = walletService.getCurrentBalance();

      expect(currentBalance).toBe(initialWallet + depositAmount);
    });
  });

  describe("Balance", () => {
    it("should return the current balance", () => {
      const currentBalance = walletService.getCurrentBalance();

      expect(currentBalance).toBe(initialWallet);
    });
  });
});
