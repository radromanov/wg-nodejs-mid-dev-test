import { WalletService } from "@api/wallet";

describe("Wallet Service", () => {
  let walletService: WalletService;
  let initialWallet = 2000;

  beforeEach(() => {
    walletService = new WalletService(initialWallet);
  });

  it("should have the necessary methods", () => {
    expect(walletService).toHaveProperty("deposit");
    expect(walletService).toHaveProperty("withdraw");
    expect(walletService).toHaveProperty("getCurrentBalance");
  });

  describe("withdraw method", () => {
    const withdrawAmount = 100;

    it("should throw an error when withdrawing a negative number", () => {
      expect(() => walletService.withdraw(-100)).toThrow(
        "Amount must be a positive number"
      );
    });

    it("should throw an error when withdrawing an excessive amount", () => {
      expect(() => walletService.withdraw(initialWallet + 1)).toThrow(
        `You do not have sufficient funds to withdraw ${initialWallet + 1}`
      );
    });

    it("should withdraw and return new balance", () => {
      walletService.withdraw(withdrawAmount);
      const currentBalance = walletService.getCurrentBalance();

      expect(currentBalance).toBe(initialWallet - withdrawAmount);
    });
  });

  describe("deposit method", () => {
    const depositAmount = 100;

    it("should throw an error when depositing a negative number", () => {
      expect(() => walletService.deposit(-100)).toThrow(
        "Amount must be a positive number"
      );
    });

    it("should deposit and return new balance", () => {
      walletService.deposit(depositAmount);
      const currentBalance = walletService.getCurrentBalance();

      expect(currentBalance).toBe(initialWallet + depositAmount);
    });

    it("should handle multiple deposits correctly", () => {
      walletService.deposit(depositAmount);
      walletService.deposit(depositAmount);
      const currentBalance = walletService.getCurrentBalance();

      expect(currentBalance).toBe(initialWallet + depositAmount * 2);
    });
  });

  describe("getCurrentBalance method", () => {
    it("should return the current balance", () => {
      const currentBalance = walletService.getCurrentBalance();

      expect(currentBalance).toBe(initialWallet);
    });
  });
});
