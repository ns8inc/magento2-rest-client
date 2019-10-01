import { RestClient } from '..';
import { format } from 'util';

export class ConfigurableChildren {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(sku) {
    const endpointUrl = format('/configurable-products/%s/children', encodeURIComponent(sku));
    return this.restClient.get(endpointUrl);
  }
}