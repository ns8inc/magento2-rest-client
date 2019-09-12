import RestClient from '../core/RestClient';
const util = require('util');

export default class CategoryProducts {
	public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }
  list(categoryId) {
    const endpointUrl = util.format('/categories/%d/products', categoryId);
    return this.restClient.get(endpointUrl);
  }
}