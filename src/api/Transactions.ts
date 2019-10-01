import { RestClient, Transaction } from '..';
const util = require('util');

export class Transactions {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  async list(searchCriteria): Promise<Transaction[]> {
    const query = 'searchCriteria=' + searchCriteria;
    const endpointUrl = util.format('/transactions?%s', query);
    const transactions = await this.restClient.get(endpointUrl) as Transaction[];
    return transactions;
  };

  async get(transactionId: number): Promise<Transaction> {
    const endpointUrl = util.format('/transactions/%d', transactionId);
    const transaction = await this.restClient.get(endpointUrl) as Transaction;
    return transaction;
  };
};