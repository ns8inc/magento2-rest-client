import { ConfigurableItemOption, ParentItemClass } from '.';
export interface BundleOption {
  extension_attributes?: ParentItemClass;
  option_id?: number;
  option_qty?: number;
  option_selections?: number[];
}

export interface CustomOption {
  extension_attributes?: CustomOptionExtensionAttributes;
  option_id?: string;
  option_value?: string;
}

export interface CustomOptionExtensionAttributes {
  file_info?: FileInfo;
}

export interface FileInfo {
  base64_encoded_data?: string;
  name?: string;
  type?: string;
}

export interface DownloadableOption {
  downloadable_links?: number[];
}

export interface GiftcardItemOption {
  custom_giftcard_amount?: number;
  extension_attributes?: ParentItemClass;
  giftcard_amount?: string;
  giftcard_message?: string;
  giftcard_recipient_email?: string;
  giftcard_recipient_name?: string;
  giftcard_sender_email?: string;
  giftcard_sender_name?: string;
}

export interface ProductOptionExtensionAttributes {
  configurable_item_options: ConfigurableItemOption[];
  custom_options?: CustomOption[];
  bundle_options?: BundleOption[];
  downloadable_option?: DownloadableOption;
  giftcard_item_option?: GiftcardItemOption;
}
