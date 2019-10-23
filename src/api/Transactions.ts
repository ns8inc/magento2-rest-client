import { RestClient, Transaction, TransactionData } from '..';
import { format } from 'util';

export class Transactions {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  async list(searchCriteria: string = ''): Promise<TransactionData> {
    const query = 'searchCriteria=' + searchCriteria;
    const endpointUrl = format('/transactions?%s', query);
    const transactions = await this.restClient.get(endpointUrl) as TransactionData;
    return transactions;
  };

  async get(transactionId: number): Promise<Transaction> {
    const endpointUrl = format('/transactions/%d', transactionId);
    const transaction = await this.restClient.get(endpointUrl) as Transaction;
    return transaction;
  };

  async getByTransactionId(transactionId: string): Promise<Transaction | undefined> {
    let query = `&searchCriteria[filterGroups][0][filters][0][field]=txn_id&searchCriteria[filterGroups][0][filters][0][value]=${transactionId}`;

    const transactions = await this.list(query);
    if (transactions.items && transactions.items[0]) {
      return transactions.items[0] as Transaction;
    }
  };
};