import RestClient from '../core/RestClient';
var util = require('util');

export default class TaxRules {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(searchCriteria) {
    var query = 'searchCriteria=' + searchCriteria;
    var endpointUrl = util.format('/taxRules/search?%s', query);
    return this.restClient.get(endpointUrl);
  }

  create(ruleAttributes) {
    return this.restClient.post('/taxRules', ruleAttributes);
  }

  update(ruleId, ruleAttributes) {
    var endpointUrl = util.format('/taxRules/%d', ruleId);
    return this.restClient.put(endpointUrl, ruleAttributes);
  }

  delete(ruleId) {
    var endpointUrl = util.format('/taxRules/%d', ruleId);
    return this.restClient.delete(endpointUrl);
  }
}