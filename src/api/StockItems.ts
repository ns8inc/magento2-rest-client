import RestClient from '../core/RestClient';
var util = require('util');

export default class StockItems {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(sku) {
    var endpointUrl = util.format('/stockItems/%s', encodeURIComponent(sku));
    return this.restClient.get(endpointUrl);
  }

  // MSI
  getSalableQty(sku, stockId) {
    var endpointUrl = util.format(
      '/inventory/get-product-salable-quantity/%s/%d',
      encodeURIComponent(sku),
      encodeURIComponent(stockId)
    );
    return this.restClient.get(endpointUrl);
  }

  // MSI
  isSalable(sku, stockId) {
    var endpointUrl = util.format(
      '/inventory/is-product-salable/%s/%d',
      encodeURIComponent(sku),
      encodeURIComponent(stockId)
    );
    return this.restClient.get(endpointUrl);
  }

}