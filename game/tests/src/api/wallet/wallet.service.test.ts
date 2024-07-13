import { WalletService } from "@api/wallet";
import { AppError } from "@core/AppError";
import { walletApi } from "@lib/axios";

jest.mock("@lib/axios");

describe("Wallet Service", () => {
  let walletService: WalletService;

  beforeEach(() => {
    walletService = new WalletService(walletApi);
  });

  afterEach(() => {
    jest.clearAllMocks();
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
        it(`should throw a 400 if ${description}`, async () => {
          if (typeof amount === "number") {
            await expect(walletService.withdraw(amount)).rejects.toThrow(
              AppError.BadRequest(
                "Withdraw Error: Amount must be a positive number"
              )
            );
          } else {
            await expect(walletService.withdraw(amount)).rejects.toThrow(
              AppError.BadRequest(
                `Withdraw Error: Amount must be of type 'number'. Provided ${typeof amount}`
              )
            );
          }
        });
      });
    });

    describe("Valid Inputs", () => {
      beforeEach(async () => {
        walletService = new WalletService(walletApi);
      });

      const validInputs: { amount: any; description: string }[] = [
        { amount: 123, description: "'amount' is a positive integer" },
        { amount: 123.4, description: "'amount' is a positive decimal" },
      ];

      validInputs.forEach(({ amount, description }) => {
        it(`should successfully withdraw amount if ${description}`, async () => {
          const balance = 1000; // Mock initial balance
          //@ts-ignore
          walletApi.get.mockResolvedValueOnce({
            data: { currentBalance: balance },
          });
          //@ts-ignore
          walletApi.post.mockResolvedValueOnce({}); // Mock successful withdrawal

          await walletService.withdraw(amount);

          const currentBalanceResponse = {
            data: { currentBalance: balance - amount },
          };
          //@ts-ignore
          walletApi.get.mockResolvedValueOnce(currentBalanceResponse);
          const currentBalance = await walletService.getCurrentBalance();

          expect(currentBalance).toBe(balance - amount);
        });
      });

      it("should throw an error when withdrawing an excessive amount", async () => {
        const balance = 1000; // Mock initial balance
        //@ts-ignore
        walletApi.get.mockResolvedValueOnce({
          data: { currentBalance: balance },
        });

        await expect(walletService.withdraw(balance + 1)).rejects.toThrow(
          AppError.BadRequest(
            `Withdraw Error: You do not have sufficient funds to withdraw ${
              balance + 1
            }`
          )
        );
      });
    });
  });
});
