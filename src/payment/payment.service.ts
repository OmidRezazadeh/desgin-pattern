import { Inject, Injectable } from '@nestjs/common';
import { PAYMENT_STRATEGIES, PaymentStrategy } from './strategies/payment.strategy.js';

type PaymentMethod = 'credit-card' | 'bank-transfer';

type PaymentStrategies = Record<PaymentMethod, PaymentStrategy>;

@Injectable()
export class PaymentService {
  constructor(
    @Inject(PAYMENT_STRATEGIES)
    private readonly strategies: PaymentStrategies,
  ) {}

  async pay(
    method: PaymentMethod,
    amount: number,
  ): Promise<void> {
    const strategy = this.strategies[method];

    if (!strategy) {
      throw new Error(`Unsupported payment method: ${method}`);
    }

    await strategy.pay(amount);
  }
}