import RestClient from '../core/RestClient';
const util = require('util');

export default class Reviews {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  getByProductSku(sku) {
    const endpointUrl = util.format('/products/%s/review', encodeURIComponent(sku));
    return this.restClient.get(endpointUrl);
  };

  list = function (searchCriteria) {
    const query = 'searchCriteria=' + searchCriteria;
    const endpointUrl = util.format('/reviews/?%s', query);
    return this.restClient.get(endpointUrl);
  };

  create(reviewData) {
    return this.restClient.post('/reviews', {
      review: reviewData
    })
  }

  delete(reviewId) {
    var endpointUrl = util.format('/reviews/%d', reviewId);
    return this.restClient.delete(endpointUrl);
  }
}