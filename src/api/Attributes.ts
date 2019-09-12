var util = require('util');
import RestClient from '../core/RestClient';

export default class Attributes {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(searchCriteria) {
    var query = 'searchCriteria=' + searchCriteria;
    var endpointUrl = util.format('/products/attributes?%s', query);
    return this.restClient.get(endpointUrl);
  }

  create(categoryAttributes) {
    return this.restClient.post('/products/attributes', categoryAttributes);
  }

  update(attributeId, categoryAttributes) {
    var endpointUrl = util.format('/products/attributes/%d', attributeId);
    return this.restClient.put(endpointUrl, categoryAttributes);
  }

  delete(attributeId) {
    var endpointUrl = util.format('/products/attributes/%d', attributeId);
    return this.restClient.delete(endpointUrl);
  }
}