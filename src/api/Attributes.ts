import { format } from 'util';
import { RestClient } from '..';

export class Attributes {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(searchCriteria: string) {
    const query = 'searchCriteria=' + searchCriteria;
    const endpointUrl = format('/products/attributes?%s', query);
    return this.restClient.get(endpointUrl);
  }

  create(categoryAttributes: any) {
    return this.restClient.post('/products/attributes', categoryAttributes);
  }

  update(id: number, categoryAttributes: any) {
    const endpointUrl = format('/products/attributes/%d', id);
    return this.restClient.put(endpointUrl, categoryAttributes);
  }

  delete(id: number) {
    const endpointUrl = format('/products/attributes/%d', id);
    return this.restClient.delete(endpointUrl);
  }
}