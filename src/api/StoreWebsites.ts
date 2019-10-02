import { RestClient } from '..';
import { StoreWebsite } from '../models';

export class StoreWebsites {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(): StoreWebsite[] {
    return this.restClient.get('/store/websites');
  };

  get(storeWebsiteId: number): (StoreWebsite | undefined) {
    return this.list().find((storeWebsite: StoreWebsite) => storeWebsite.id === storeWebsiteId);
  };
};
