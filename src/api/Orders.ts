import { RestClient, Convert } from '../core';
import { OrderData, Order } from '../models';
import { format } from 'util';

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
  async incrementIdById(oderId: number): Promise<Order> {
    const order = await this.restClient.get('/orders/' + oderId + '?fields=increment_id') as Order;
    return order;
  }

  async list(searchCriteria: string = ''): Promise<OrderData> {
    const query = 'searchCriteria=' + searchCriteria;
    const endpointUrl = format('/orders?%s', query);
    const orders = await this.restClient.get(endpointUrl) as OrderData;
    return orders;
  };

  async get(orderId: number): Promise<Order> {
    const endpointUrl = format('/orders/%d', orderId);
    const order = await this.restClient.get(endpointUrl) as Order;
    return order;
  };

  async statuses(orderId: number): Promise<any> {
    const endpointUrl = `${format('/orders/%d', orderId)}/statuses`;
    return await this.restClient.get(endpointUrl);
  };

  async cancel(orderId: number): Promise<any> {
    const endpointUrl = `${format('/orders/%d', orderId)}/cancel`;
    return await this.restClient.post(endpointUrl);
  };

  async hold(orderId: number): Promise<any> {
    const endpointUrl = `${format('/orders/%d', orderId)}/hold`;
    return await this.restClient.post(endpointUrl);
  };

  async unhold(orderId: number): Promise<any> {
    const endpointUrl = `${format('/orders/%d', orderId)}/unhold`;
    return await this.restClient.post(endpointUrl);
  };
}