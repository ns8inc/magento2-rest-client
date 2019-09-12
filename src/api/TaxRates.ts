import RestClient from '../core/RestClient';
const util = require('util');

export default class TaxRates {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(rateId) {
    const endpointUrl = util.format('/taxRates/%d', rateId);
    return this.restClient.get(endpointUrl);
  }

  create(rateAttributes) {
    return this.restClient.post('/taxRates', rateAttributes);
  }

  update(rateId, rateAttributes) {
    const endpointUrl = util.format('/taxRates/%d', rateId);
    return this.restClient.put(endpointUrl, rateAttributes);
  }

  delete(rateId) {
    const endpointUrl = util.format('/taxRates/%d', rateId);
    return this.restClient.delete(endpointUrl);
  }
}
