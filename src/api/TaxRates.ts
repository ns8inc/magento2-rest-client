import { RestClient } from '..';
import { format } from 'util';

export class TaxRates {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(rateId) {
    const endpointUrl = format('/taxRates/%d', rateId);
    return this.restClient.get(endpointUrl);
  }

  create(rateAttributes) {
    return this.restClient.post('/taxRates', rateAttributes);
  }

  update(rateId, rateAttributes) {
    const endpointUrl = format('/taxRates/%d', rateId);
    return this.restClient.put(endpointUrl, rateAttributes);
  }

  delete(rateId) {
    const endpointUrl = format('/taxRates/%d', rateId);
    return this.restClient.delete(endpointUrl);
  }
}
