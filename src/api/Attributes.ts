const util = require('util');
import { RestClient } from '..';

export class Attributes {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(searchCriteria) {
    const query = 'searchCriteria=' + searchCriteria;
    const endpointUrl = util.format('/products/attributes?%s', query);
    return this.restClient.get(endpointUrl);
  }

  create(categoryAttributes) {
    return this.restClient.post('/products/attributes', categoryAttributes);
  }

  update(attributeId, categoryAttributes) {
    const endpointUrl = util.format('/products/attributes/%d', attributeId);
    return this.restClient.put(endpointUrl, categoryAttributes);
  }

  delete(attributeId) {
    const endpointUrl = util.format('/products/attributes/%d', attributeId);
    return this.restClient.delete(endpointUrl);
  }
}