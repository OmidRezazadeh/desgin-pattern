import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service.js";
import { BankTransferStrategy } from "./strategies/bank-transfer.strategy.js";
import { CreditCardStrategy } from "./strategies/credit-card.strategy.js";
import { PAYMENT_STRATEGIES } from "./strategies/payment.strategy.js";


@Module({
  providers: [
    PaymentService,
    CreditCardStrategy,
    BankTransferStrategy,
    {
      provide: PAYMENT_STRATEGIES,
      useFactory: (
        creditCardStrategy: CreditCardStrategy,
        bankTransferStrategy: BankTransferStrategy,
      ) => ({
        'credit-card': creditCardStrategy,
        'bank-transfer': bankTransferStrategy,
      }),
      inject: [CreditCardStrategy, BankTransferStrategy],
    },
  ],
})
export class PaymentModule {}