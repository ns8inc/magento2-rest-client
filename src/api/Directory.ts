import RestClient from '../core/RestClient';
var util = require('util');

export default class Directory {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  countries() {
    var endpointUrl = util.format('/directory/countries');
    return this.restClient.get(endpointUrl);
  }

  currency() {
    var endpointUrl = util.format('/directory/currency');
    return this.restClient.get(endpointUrl);
  }
}