import { WalletService } from "@api/wallet";
import { AppError } from "@core/AppError";

describe("Wallet Service", () => {
  let initialWallet: number;
  let walletService: WalletService;
  let wallet: number;

  beforeEach(() => {
    initialWallet = 2000;
    walletService = new WalletService(initialWallet);
    wallet = walletService.getCurrentBalance();
  });

  describe("Method Validation", () => {
    const availableMethods = ["deposit", "withdraw", "getCurrentBalance"];

    availableMethods.forEach((method) => {
      it(`should contain ${method}`, () => {
        expect(walletService).toHaveProperty(method);
      });
    });
  });

  describe("withdraw method", () => {
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
        it(`should throw a 400 if ${description}`, () => {
          if (typeof amount === "number") {
            expect(() => walletService.withdraw(amount)).toThrow(
              AppError.BadRequest(
                "Withdraw Error: Amount must be a positive number"
              )
            );
          } else {
            expect(() => walletService.withdraw(amount)).toThrow(
              AppError.BadRequest(
                `Withdraw Error: Amount must be of type 'number'. Provided ${typeof amount}`
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
        it(`should successfully withdraw amount if ${description}`, () => {
          walletService.withdraw(amount);
          const currentBalance = walletService.getCurrentBalance();

          expect(currentBalance).toBe(wallet - amount);
        });
      });

      it("should throw an error when withdrawing an excessive amount", () => {
        expect(() => walletService.withdraw(wallet + 1)).toThrow(
          AppError.BadRequest(
            `Withdraw Error: You do not have sufficient funds to withdraw ${
              wallet + 1
            }`
          )
        );
      });
    });
  });

  describe("deposit method", () => {
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
        it(`should throw a 400 if ${description}`, () => {
          if (typeof amount === "number") {
            expect(() => walletService.deposit(amount)).toThrow(
              AppError.BadRequest(
                "Deposit Error: Amount must be a positive number"
              )
            );
          } else {
            expect(() => walletService.deposit(amount)).toThrow(
              AppError.BadRequest(
                `Deposit Error: Amount must be of type 'number'. Provided ${typeof amount}`
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
        it(`should successfully deposit amount if ${description}`, () => {
          walletService.deposit(amount);
          const currentBalance = walletService.getCurrentBalance();

          expect(currentBalance).toBe(wallet + amount);
        });
      });

      it("should handle multiple deposits correctly", () => {
        const depositAmount = 100;
        walletService.deposit(depositAmount);
        walletService.deposit(depositAmount);
        const currentBalance = walletService.getCurrentBalance();

        expect(currentBalance).toBe(initialWallet + depositAmount * 2);
      });
    });
  });

  describe("getCurrentBalance method", () => {
    it("should return the current balance", () => {
      const currentBalance = walletService.getCurrentBalance();

      expect(currentBalance).toBe(initialWallet);
    });
  });
});
