import { RestClient } from '..';
import { format } from 'util';

export class Directory {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  countries() {
    const endpointUrl = format('/directory/countries');
    return this.restClient.get(endpointUrl);
  }

  currency() {
    const endpointUrl = format('/directory/currency');
    return this.restClient.get(endpointUrl);
  }
}