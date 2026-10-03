import { PaymentStrategy } from "./payment.strategy.js";
import { Injectable } from "@nestjs/common";
@Injectable()
export class CreditCardStrategy implements PaymentStrategy {
    async pay(amount: number): Promise<void> {
      console.log(`Paid ${amount} with credit card`);
    }
  }