import { RestClient } from '..';
import { StoreConfig } from '../models';

export class StoreConfigs {
  public restClient: RestClient;

  constructor(restClient: RestClient) {
    this.restClient = restClient;
  }

  list(): StoreConfig[] {
    return this.restClient.get('/store/storeConfigs');
  };

  get(storeConfigId: number): (StoreConfig | undefined) {
    return this.list().find((storeConfig: StoreConfig) => storeConfig.id === storeConfigId);
  };
};
