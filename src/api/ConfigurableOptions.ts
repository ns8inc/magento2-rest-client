import RestClient from '../core/RestClient';
var util = require('util');

export default class ConfigurableOptions {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(sku) {
    var endpointUrl = util.format('/configurable-products/%s/options/all', encodeURIComponent(sku));
    return this.restClient.get(endpointUrl);
  }
}