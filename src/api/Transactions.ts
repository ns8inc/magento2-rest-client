import RestClient from '../core/RestClient';
var util = require('util');

export default class Transactions {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(searchCriteria) {
    var query = 'searchCriteria=' + searchCriteria;
    var endpointUrl = util.format('/transactions?%s', query);
    return this.restClient.get(endpointUrl);
  };

  get(transactionId) {
    return this.restClient.get(util.format('/transactions/%id', transactionId));
  };
};