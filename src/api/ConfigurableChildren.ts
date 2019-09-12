import RestClient from '../core/RestClient';
const util = require('util');

export default class ConfigurableChildren {
	public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(sku) {
    const endpointUrl = util.format('/configurable-products/%s/children', encodeURIComponent(sku));
    return this.restClient.get(endpointUrl);
  }
}