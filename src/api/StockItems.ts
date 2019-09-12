import RestClient from '../core/RestClient';
const util = require('util');

export default class StockItems {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(sku) {
    const endpointUrl = util.format('/stockItems/%s', encodeURIComponent(sku));
    return this.restClient.get(endpointUrl);
  }

  // MSI
  getSalableQty(sku, stockId) {
    const endpointUrl = util.format(
      '/inventory/get-product-salable-quantity/%s/%d',
      encodeURIComponent(sku),
      encodeURIComponent(stockId)
    );
    return this.restClient.get(endpointUrl);
  }

  // MSI
  isSalable(sku, stockId) {
    const endpointUrl = util.format(
      '/inventory/is-product-salable/%s/%d',
      encodeURIComponent(sku),
      encodeURIComponent(stockId)
    );
    return this.restClient.get(endpointUrl);
  }

}