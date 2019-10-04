export interface StoreConfig {
  id: number;
  code: string;
  websiteID: number;
  locale: string;
  baseCurrencyCode: string;
  defaultDisplayCurrencyCode: string;
  timezone: string;
  weightUnit: string;
  baseURL: string;
  baseLinkURL: string;
  baseStaticURL: string;
  baseMediaURL: string;
  secureBaseURL: string;
  secureBaseLinkURL: string;
  secureBaseStaticURL: string;
  secureBaseMediaURL: string;
  extensionAttributes: StoreConfigExtensionAttributes;
}

export interface StoreConfigExtensionAttributes {
}
