export interface Transaction {
  transactionID: number;
  parentID: number | null;
  orderID: number;
  paymentID: number;
  txnID: string;
  parentTxnID: string;
  txnType: TxnType;
  isClosed: number;
  additionalInformation: string[] | null;
  createdAt: string;
  childTransactions: Transaction[];
  extensionAttributes: ExtensionAttributes | null;
}

export enum TxnType {
  Payment = 'payment',
  Order = 'order',
  Authorization = 'authorization',
  Capture = 'capture',
  Void = 'void',
  Refund = 'refund'
}

export interface ExtensionAttributes {}
