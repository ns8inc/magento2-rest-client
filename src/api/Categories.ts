import { RestClient } from '..';
import { format } from 'util';

export class Categories {
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
    const endpointUrl = format('/categories/%d', categoryId);
    return this.restClient.put(endpointUrl, categoryAttributes);
  }

  delete(categoryId) {
    const endpointUrl = format('/categories/%d', categoryId);
    return this.restClient.delete(endpointUrl);
  }
}