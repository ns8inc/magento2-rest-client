import RestClient from '../core/RestClient';
var util = require('util');

export default class Categories {
	public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list() {
    return this.restClient.get('/categories');
  }

  create(categoryAttributes) {
    return this.restClient.post('/categories', categoryAttributes);
  }

  update(categoryId, categoryAttributes) {
    var endpointUrl = util.format('/categories/%d', categoryId);
    return this.restClient.put(endpointUrl, categoryAttributes);
  }

  delete(categoryId) {
    var endpointUrl = util.format('/categories/%d', categoryId);
    return this.restClient.delete(endpointUrl);
  }
}