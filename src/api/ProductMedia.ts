import { RestClient } from '..';
import { format } from 'util';

export class ProductMedia {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(productSku) {
    const endpointUrl = format('/products/%s/media', productSku);
    return this.restClient.get(endpointUrl);
  }

  get(productSku, mediaId) {
    const endpointUrl = format('/products/%s/media/%d', encodeURIComponent(productSku), mediaId);
    return this.restClient.get(endpointUrl);
  }

  create(productSku, productMediaAttributes) {
    const endpointUrl = format('/products/%s/media', encodeURIComponent(productSku));
    return this.restClient.post(endpointUrl, productMediaAttributes);
  }

  update(productSku, mediaId, productMediaAttributes) {
    const endpointUrl = format('/products/%s/media/%d', encodeURIComponent(productSku), mediaId);
    return this.restClient.put(endpointUrl, productMediaAttributes);
  }

  delete(productSku, mediaId) {
    const endpointUrl = format('/products/%s/media/%d', encodeURIComponent(productSku), mediaId);
    return this.restClient.delete(endpointUrl);
  }
}