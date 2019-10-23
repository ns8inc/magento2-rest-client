export enum OrderState {
  CANCELED = 'canceled',
  CLOSED = 'closed',
  COMPLETE = 'complete',
  ON_HOLD = 'holded',
  PAYMENT_REVIEW = 'payment_review',
  PENDING = 'new',
  PENDING_PAYMENT = 'pending_payment',
  PROCESSING = 'processing',
  SUSPECTED_FRAUD = 'processing',
}

export enum OrderStatus {
  CANCELED = 'canceled',
  CLOSED = 'closed',
  COMPLETE = 'complete',
  ON_HOLD = 'holded',
  PAYMENT_REVIEW = 'payment_review',
  PENDING = 'pending',
  PENDING_PAYMENT = 'pending_payment',
  PROCESSING = 'processing',
  SUSPECTED_FRAUD = 'fraud',
}
