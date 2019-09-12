import RestClient from '../core/RestClient';
const util = require('util');

export default class Transactions {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(searchCriteria) {
    const query = 'searchCriteria=' + searchCriteria;
    const endpointUrl = util.format('/transactions?%s', query);
    return this.restClient.get(endpointUrl);
  };

  get(transactionId) {
    return this.restClient.get(util.format('/transactions/%id', transactionId));
  };
};