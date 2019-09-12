import RestClient from '../core/RestClient';
var util = require('util');

export default class CategoryProducts {
	public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }
  list(categoryId) {
    var endpointUrl = util.format('/categories/%d/products', categoryId);
    return this.restClient.get(endpointUrl);
  }
}