export interface Store {
  id: number;
  code: string;
  name: string;
  websiteID: number;
  storeGroupID: number;
  extensionAttributes: StoreExtensionAttributes;
}

export interface StoreExtensionAttributes {
}
