import { RestClient } from '..';
import { format } from 'util';

export class Products {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(searchCriteria) {
    const query = 'searchCriteria=' + searchCriteria;
    const endpointUrl = format('/products?%s', query);
    return this.restClient.get(endpointUrl);
  }
  renderList(searchCriteria, currencyCode = 'USD', storeId = 1) {
    const query = 'searchCriteria=' + searchCriteria;
    const endpointUrl = format('/products-render-info?%s&storeId=%d&currencyCode=' + encodeURIComponent(currencyCode), query, storeId);
    return this.restClient.get(endpointUrl);
  }
  create(productAttributes) {
    return this.restClient.post('/products', productAttributes);
  }

  update(productSku, productAttributes) {
    const endpointUrl = format('/products/%s', encodeURIComponent(productSku));
    return this.restClient.put(endpointUrl, productAttributes);
  }

  delete(productSku) {
    const endpointUrl = format('/products/%s', encodeURIComponent(productSku));
    return this.restClient.delete(endpointUrl);
  }
}