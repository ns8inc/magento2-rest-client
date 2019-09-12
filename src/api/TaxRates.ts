import RestClient from '../core/RestClient';
var util = require('util');

export default class TaxRates {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(rateId) {
    var endpointUrl = util.format('/taxRates/%d', rateId);
    return this.restClient.get(endpointUrl);
  }

  create(rateAttributes) {
    return this.restClient.post('/taxRates', rateAttributes);
  }

  update(rateId, rateAttributes) {
    var endpointUrl = util.format('/taxRates/%d', rateId);
    return this.restClient.put(endpointUrl, rateAttributes);
  }

  delete(rateId) {
    var endpointUrl = util.format('/taxRates/%d', rateId);
    return this.restClient.delete(endpointUrl);
  }
}
