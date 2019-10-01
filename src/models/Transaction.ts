import { SearchCriteria } from '.';

export interface TransactionData {
  items: Transaction[];
  search_criteria: SearchCriteria;
  total_count: number;
}

export interface Transaction {
  additional_information: string[] | null;
  child_transactions: Transaction[];
  created_at: string;
  extension_attributes: TransactionExtensionAttributes | null;
  is_closed: number;
  order_id: number;
  parent_id: number | null;
  parent_txn_id: string;
  payment_id: number;
  transaction_id: number;
  txn_id: string;
  txn_type: TxnType;
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
