import { RestClient } from '..';
import { format } from 'util';

export class CategoryProducts {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }
  list(categoryId) {
    const endpointUrl = format('/categories/%d/products', categoryId);
    return this.restClient.get(endpointUrl);
  }
}