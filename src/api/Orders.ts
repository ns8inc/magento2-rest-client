import { RestClient } from '../core';
import { OrderData, Order, StatusHistory } from '../models';
import { format } from 'util';

export class Orders {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  /**
   * @see https://devdocs.magento.com/guides/v2.3/rest/retrieve-filtered-responses.html
   * @see salesOrderRepositoryV1: GET /V1/orders/{id}
   * @param oderId
   * @returns {Promise<{increment_id: String}>}
   */
  async incrementIdById(oderId: number): Promise<Order> {
    const order = await this.restClient.get('/orders/' + oderId + '?fields=increment_id') as Order;
    return order;
  }

  /**
   * @see https://devdocs.magento.com/swagger/#/salesOrderRepositoryV1/salesOrderRepositoryV1GetListGet
   * @param searchCriteria
   * @returns {Promise<OrderData}
   */
  async list(searchCriteria: string = ''): Promise<OrderData> {
    const query = 'searchCriteria=' + searchCriteria;
    const endpointUrl = format('/orders?%s', query);
    const orders = await this.restClient.get(endpointUrl) as OrderData;
    return orders;
  };

  /**
   * @see https://devdocs.magento.com/swagger/#/salesOrderRepositoryV1/salesOrderRepositoryV1GetGet
   * @param orderId
   * @returns {Promise<Order>}
   */
  async get(orderId: number): Promise<Order> {
    const endpointUrl = format('/orders/%d', orderId);
    const order = await this.restClient.get(endpointUrl) as Order;
    return order;
  };

  /**
   * @see https://devdocs.magento.com/swagger/#/salesOrderManagementV1/salesOrderManagementV1GetStatusGet
   * @param orderId
   * @returns {Promise<string>}
   */
  async getStatus(orderId: number): Promise<string> {
    const endpointUrl = `${format('/orders/%d', orderId)}/statuses`;
    return await this.restClient.get(endpointUrl);
  };

  /**
   * @see https://devdocs.magento.com/swagger/#/salesOrderManagementV1/salesOrderManagementV1CancelPost
   * @param orderId
   * @returns {Promise<boolean>}
   */
  async cancel(orderId: number): Promise<boolean> {
    const endpointUrl = `${format('/orders/%d', orderId)}/cancel`;
    return await this.restClient.post(endpointUrl);
  };

  /**
   * @see https://devdocs.magento.com/swagger/#/salesOrderManagementV1/salesOrderManagementV1HoldPost
   * @param orderId
   * @returns {Promise<boolean>}
   */
  async hold(orderId: number): Promise<boolean> {
    const endpointUrl = `${format('/orders/%d', orderId)}/hold`;
    return await this.restClient.post(endpointUrl);
  };

  /**
   * @see https://devdocs.magento.com/swagger/#/salesOrderManagementV1/salesOrderManagementV1UnHoldPost
   * @param orderId
   * @returns {Promise<boolean>}
   */
  async unhold(orderId: number): Promise<boolean> {
    const endpointUrl = `${format('/orders/%d', orderId)}/unhold`;
    return await this.restClient.post(endpointUrl);
  };

  /**
   * @see https://devdocs.magento.com/swagger/#/salesOrderManagementV1/salesOrderManagementV1AddCommentPost
   * @param orderId
   * @param comment
   * @returns {Promise<boolean>}
   */
  async postComment(orderId: number, comment: Partial<StatusHistory>): Promise<boolean> {
    const endpointUrl = `${format('/orders/%d', orderId)}/comments`;
    if (!comment.created_at) comment.created_at = new Date();
    return await this.restClient.post(endpointUrl, {statusHistory: comment});
  }

  /**
   * @see https://devdocs.magento.com/swagger/#/salesOrderManagementV1/salesOrderManagementV1GetCommentsListGet
   * @param orderId
   * @returns {Promise<StatusHistory>}
   */
  async getComments(orderId: number): Promise<StatusHistory> {
    const endpointUrl = `${format('/orders/%d', orderId)}/comments`;
    return await this.restClient.get(endpointUrl).items;
  }
}