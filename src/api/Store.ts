import { RestClient } from '..';
import { Store } from '../models';

export class Stores {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(): Store[] {
    return this.restClient.get('/store/storeViews');
  };

  get(storeId: number): (Store | undefined) {
    return this.list().find((store: Store) => store.id === storeId);
  };
};
