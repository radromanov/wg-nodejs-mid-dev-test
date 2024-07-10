import { AppError } from "@core/AppError";
import { WALLET_STARTER } from "@lib/constants";

export class WalletService {
  private wallet: number;

  constructor(initialWallet?: number) {
    this.wallet = initialWallet || WALLET_STARTER;
  }

  deposit(amount: number) {
    this.wallet += amount;
  }

  withdraw(amount: number) {
    if (amount > this.wallet) {
      throw AppError.BadRequest(
        `You do not have sufficient funds to withdraw ${amount}`
      );
    }

    this.wallet -= amount;
  }

  getCurrentBalance() {
    return this.wallet;
  }
}
