export const PAYMENT_STRATEGIES = Symbol('PAYMENT_STRATEGIES');

export interface PaymentStrategy {
  pay(amount: number): Promise<void>;
}