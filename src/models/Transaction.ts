export interface Transaction {
  additionalInformation: string[] | null;
  childTransactions: Transaction[];
  createdAt: string;
  extensionAttributes: TransactionExtensionAttributes | null;
  isClosed: number;
  orderID: number;
  parentID: number | null;
  parentTxnID: string;
  paymentID: number;
  transactionID: number;
  txnID: string;
  txnType: TxnType;
}

export enum TxnType {
  Authorization = 'authorization',
  Capture = 'capture',
  Order = 'order',
  Payment = 'payment',
  Refund = 'refund',
  Void = 'void',
}

export interface TransactionExtensionAttributes { }
