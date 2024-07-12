import { AxiosInstance } from "axios";

export class WalletService {
  constructor(private readonly walletApi: AxiosInstance) {}

  async deposit(amount: number) {
    try {
      return await this.walletApi.post("/wallet/deposit", { amount });
    } catch (error) {
      throw error;
    }
  }

  async withdraw(amount: number) {
    try {
      return await this.walletApi.post("/wallet/withdraw", {
        amount,
      });
    } catch (error) {
      throw error;
    }
  }
}
