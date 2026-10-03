import { Injectable } from "@nestjs/common";
import { PaymentStrategy } from "./payment.strategy.js";
@Injectable()
export class WalletStrategy implements PaymentStrategy {
    async pay(amount: number): Promise<void> {
      console.log(`Paid ${amount} with wallet`);
    }
  }