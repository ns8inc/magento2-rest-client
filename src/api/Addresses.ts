import { RestClient, Address } from '..';
const util = require('util');

export class Addresses {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  async get(addressId: string): Promise<Address> {
    const endpointUrl = util.format('/customers/addresses/%d', addressId);
    const order = await this.restClient.get(endpointUrl);
    return order;
  };
}