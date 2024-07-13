import { AppError } from "@core/AppError";
import { ROUTES } from "@lib/constants";
import { AxiosInstance } from "axios";

export class WalletService {
  constructor(private readonly walletApi: AxiosInstance) {}

  async deposit(amount: number) {
    try {
      if (typeof amount !== "number") {
        throw AppError.BadRequest(
          `Deposit Error: Amount must be of type 'number'. Provided ${typeof amount}`
        );
      }
      if (amount <= 0) {
        throw AppError.BadRequest(
          "Deposit Error: Amount must be a positive number"
        );
      }

      return await this.walletApi.post(ROUTES.WALLET.DEPOSIT, { amount });
    } catch (error) {
      throw error;
    }
  }

  async withdraw(amount: number) {
    try {
      if (typeof amount !== "number") {
        throw AppError.BadRequest(
          `Withdraw Error: Amount must be of type 'number'. Provided ${typeof amount}`
        );
      }
      if (amount <= 0) {
        throw AppError.BadRequest(
          "Withdraw Error: Amount must be a positive number"
        );
      }

      const balance = await this.getCurrentBalance();

      if (amount > balance) {
        throw AppError.BadRequest(
          `Withdraw Error: You do not have sufficient funds to withdraw ${amount}`
        );
      }

      return await this.walletApi.post(ROUTES.WALLET.WITHDRAW, {
        amount,
      });
    } catch (error) {
      throw error;
    }
  }

  async getCurrentBalance() {
    try {
      const response = await this.walletApi.get<{ currentBalance: number }>(
        ROUTES.WALLET.BALANCE
      );

      return response.data.currentBalance;
    } catch (error) {
      throw error;
    }
  }
}
