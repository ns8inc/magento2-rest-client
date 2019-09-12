import RestClient from '../core/RestClient';
var util = require('util');

export default class ProductMedia {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(productSku) {
    var endpointUrl = util.format('/products/%s/media', productSku);
    return this.restClient.get(endpointUrl);
  }

  get(productSku, mediaId) {
    var endpointUrl = util.format('/products/%s/media/%d', encodeURIComponent(productSku), mediaId);
    return this.restClient.get(endpointUrl);
  }

  create(productSku, productMediaAttributes) {
    var endpointUrl = util.format('/products/%s/media', encodeURIComponent(productSku));
    return this.restClient.post(endpointUrl, productMediaAttributes);
  }

  update(productSku, mediaId, productMediaAttributes) {
    var endpointUrl = util.format('/products/%s/media/%d', encodeURIComponent(productSku), mediaId);
    return this.restClient.put(endpointUrl, productMediaAttributes);
  }

  delete(productSku, mediaId) {
    var endpointUrl = util.format('/products/%s/media/%d', encodeURIComponent(productSku), mediaId);
    return this.restClient.delete(endpointUrl);
  }
}