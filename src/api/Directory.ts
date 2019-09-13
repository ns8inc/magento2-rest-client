import { RestClient } from '..';
const util = require('util');

export class Directory {
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