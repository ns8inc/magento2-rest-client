import RestClient from '../core/RestClient';
var util = require('util');

export default class Products {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(searchCriteria) {
    var query = 'searchCriteria=' + searchCriteria;
    var endpointUrl = util.format('/products?%s', query);
    return this.restClient.get(endpointUrl);
  }
  renderList(searchCriteria, currencyCode = 'USD', storeId = 1) {
    var query = 'searchCriteria=' + searchCriteria;
    var endpointUrl = util.format('/products-render-info?%s&storeId=%d&currencyCode=' + encodeURIComponent(currencyCode), query, storeId);
    return this.restClient.get(endpointUrl);
  }
  create(productAttributes) {
    return this.restClient.post('/products', productAttributes);
  }

  update(productSku, productAttributes) {
    var endpointUrl = util.format('/products/%s', encodeURIComponent(productSku));
    return this.restClient.put(endpointUrl, productAttributes);
  }

  delete(productSku) {
    var endpointUrl = util.format('/products/%s', encodeURIComponent(productSku));
    return this.restClient.delete(endpointUrl);
  }
}