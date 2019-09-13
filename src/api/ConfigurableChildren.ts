import { RestClient } from '..';
const util = require('util');

export class ConfigurableChildren {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(sku) {
    const endpointUrl = util.format('/configurable-products/%s/children', encodeURIComponent(sku));
    return this.restClient.get(endpointUrl);
  }
}