import { AppError } from "@core/AppError";
import { WALLET_STARTER } from "@lib/constants";

export class WalletService {
  private wallet: number;

  constructor(initialWallet?: number) {
    this.wallet = initialWallet || WALLET_STARTER;
  }

  deposit(amount: number) {
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

    this.wallet += amount;
  }

  withdraw(amount: number) {
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
    if (amount > this.wallet) {
      throw AppError.BadRequest(
        `Withdraw Error: You do not have sufficient funds to withdraw ${amount}`
      );
    }

    this.wallet -= amount;
  }

  getCurrentBalance() {
    return this.wallet;
  }
}
