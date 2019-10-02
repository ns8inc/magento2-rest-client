export interface StoreGroup {
  id: number;
  websiteID: number;
  rootCategoryID: number;
  defaultStoreID: number;
  name: string;
  code: string;
  extensionAttributes: StoreGroupExtensionAttributes;
}

export interface StoreGroupExtensionAttributes {
}

