import RestClient from '../core/RestClient';
var util = require('util');

export default class ConfigurableChildren {
	public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(sku) {
    var endpointUrl = util.format('/configurable-products/%s/children', encodeURIComponent(sku));
    return this.restClient.get(endpointUrl);
  }
}