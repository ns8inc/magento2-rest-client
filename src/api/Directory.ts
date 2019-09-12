import RestClient from '../core/RestClient';
const util = require('util');

export default class Directory {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  countries() {
    const endpointUrl = util.format('/directory/countries');
    return this.restClient.get(endpointUrl);
  }

  currency() {
    const endpointUrl = util.format('/directory/currency');
    return this.restClient.get(endpointUrl);
  }
}