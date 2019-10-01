import { RestClient } from '..';
import { format } from 'util';

export class TaxRules {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(searchCriteria) {
    const query = 'searchCriteria=' + searchCriteria;
    const endpointUrl = format('/taxRules/search?%s', query);
    return this.restClient.get(endpointUrl);
  }

  create(ruleAttributes) {
    return this.restClient.post('/taxRules', ruleAttributes);
  }

  update(ruleId, ruleAttributes) {
    const endpointUrl = format('/taxRules/%d', ruleId);
    return this.restClient.put(endpointUrl, ruleAttributes);
  }

  delete(ruleId) {
    const endpointUrl = format('/taxRules/%d', ruleId);
    return this.restClient.delete(endpointUrl);
  }
}