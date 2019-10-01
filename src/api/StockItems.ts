import { RestClient } from '..';
import { format } from 'util';

export class StockItems {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(sku) {
    const endpointUrl = format('/stockItems/%s', encodeURIComponent(sku));
    return this.restClient.get(endpointUrl);
  }

  // MSI
  getSalableQty(sku, stockId) {
    const endpointUrl = format(
      '/inventory/get-product-salable-quantity/%s/%d',
      encodeURIComponent(sku),
      encodeURIComponent(stockId)
    );
    return this.restClient.get(endpointUrl);
  }

  // MSI
  isSalable(sku, stockId) {
    const endpointUrl = format(
      '/inventory/is-product-salable/%s/%d',
      encodeURIComponent(sku),
      encodeURIComponent(stockId)
    );
    return this.restClient.get(endpointUrl);
  }

}