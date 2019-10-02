import { RestClient } from '..';
import { StoreGroup } from '../models';

export class StoreGroups {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(): StoreGroup[] {
    return this.restClient.get('/store/storeGroups');
  };

  get(storeGroupId: number): (StoreGroup | undefined) {
    return this.list().find((storeGroup: StoreGroup) => storeGroup.id === storeGroupId);
  };
};
