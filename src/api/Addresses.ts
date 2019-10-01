import { RestClient, Address } from '..';
import { format } from 'util';

export class Addresses {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  async get(id: number): Promise<Address> {
    const endpointUrl = format('/customers/addresses/%d', id);
    const order = await this.restClient.get(endpointUrl);
    return order;
  };
}