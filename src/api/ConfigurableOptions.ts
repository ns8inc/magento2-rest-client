import { RestClient } from '..';
import { format } from 'util';

export class ConfigurableOptions {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(sku) {
    const endpointUrl = format('/configurable-products/%s/options/all', encodeURIComponent(sku));
    return this.restClient.get(endpointUrl);
  }
}