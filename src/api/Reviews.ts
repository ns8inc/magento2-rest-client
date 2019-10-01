import { RestClient } from '..';
import { format } from 'util';

export class Reviews {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  getByProductSku(sku) {
    const endpointUrl = format('/products/%s/review', encodeURIComponent(sku));
    return this.restClient.get(endpointUrl);
  };

  list = function (searchCriteria) {
    const query = 'searchCriteria=' + searchCriteria;
    const endpointUrl = format('/reviews/?%s', query);
    return this.restClient.get(endpointUrl);
  };

  create(reviewData) {
    return this.restClient.post('/reviews', {
      review: reviewData
    })
  }

  delete(reviewId) {
    const endpointUrl = format('/reviews/%d', reviewId);
    return this.restClient.delete(endpointUrl);
  }
}