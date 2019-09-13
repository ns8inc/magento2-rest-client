import { RestClient } from '..';
const util = require('util');

export class CategoryProducts {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }
  list(categoryId) {
    const endpointUrl = util.format('/categories/%d/products', categoryId);
    return this.restClient.get(endpointUrl);
  }
}