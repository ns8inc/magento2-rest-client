import RestClient from '../core/RestClient';
var util = require('util');

export default class Orders {
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
  incrementIdById(oderId) {
    return this.restClient.get('/orders/' + oderId + '?fields=increment_id');
  }

  list(searchCriteria = '') {
    var query = 'searchCriteria=' + searchCriteria;
    var endpointUrl = util.format('/orders?%s', query);
    return this.restClient.get(endpointUrl);
  };

  get(orderId) {
    return this.restClient.get(util.format('/orders/%id', orderId));
  };
}