import { ROUTES } from "@lib/constants";
import { AxiosInstance } from "axios";

export class WalletService {
  constructor(private readonly walletApi: AxiosInstance) {}

  async deposit(amount: number) {
    try {
      return await this.walletApi.post(ROUTES.WALLET.DEPOSIT, { amount });
    } catch (error) {
      throw error;
    }
  }

  async withdraw(amount: number) {
    try {
      return await this.walletApi.post(ROUTES.WALLET.WITHDRAW, {
        amount,
      });
    } catch (error) {
      throw error;
    }
  }
}
