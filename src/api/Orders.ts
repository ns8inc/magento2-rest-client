import { RestClient, Convert } from '../core';
import { OrderData, Order } from '../models';
const util = require('util');

export class Orders {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  /**
   *
   * @see https://devdocs.magento.com/guides/v2.3/rest/retrieve-filtered-responses.html
   * @see salesOrderRepositoryV1: GET /V1/orders/{id}
   *
   * @param oderId
   * @returns {Promise<{increment_id: String}>}
   */
  incrementIdById(oderId: number) {
    return this.restClient.get('/orders/' + oderId + '?fields=increment_id');
  }

  async list(searchCriteria: string = ''): Promise<OrderData> {
    const query = 'searchCriteria=' + searchCriteria;
    const endpointUrl = util.format('/orders?%s', query);
    const orders = await this.restClient.get(endpointUrl) as OrderData;
    return orders;
  };

  async get(orderId: string): Promise<Order> {
    const endpointUrl = util.format('/orders/%d', orderId);
    const order = await this.restClient.get(endpointUrl) as Order;
    return order;
  };
}