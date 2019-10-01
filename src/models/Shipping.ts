import { Address, ParentItemClass } from '.';
export interface ShippingExtensionAttributes {
  collection_point?: CollectionPoint;
  ext_order_id?: string;
  shipping_experience?: ShippingExperience;
}

export interface CollectionPoint {
  city?: string;
  collection_point_id?: string;
  country?: string;
  name?: string;
  postcode?: string;
  recipient_address_id?: number;
  region?: string;
  street?: string[];
}

export interface ShippingExperience {
  code?: string;
  cost?: number;
  label?: string;
}

export interface Total {
  base_shipping_amount?: number;
  base_shipping_canceled?: number;
  base_shipping_discount_amount?: number;
  base_shipping_discount_tax_compensation_amnt?: number;
  base_shipping_incl_tax?: number;
  base_shipping_invoiced?: number;
  base_shipping_refunded?: number;
  base_shipping_tax_amount?: number;
  base_shipping_tax_refunded?: number;
  extension_attributes?: ParentItemClass;
  shipping_amount?: number;
  shipping_canceled?: number;
  shipping_discount_amount?: number;
  shipping_discount_tax_compensation_amount?: number;
  shipping_incl_tax?: number;
  shipping_invoiced?: number;
  shipping_refunded?: number;
  shipping_tax_amount?: number;
  shipping_tax_refunded?: number;
}

export interface Shipping {
  address?: Address;
  method?: string;
  total?: Total;
  extension_attributes?: ShippingExtensionAttributes;
}
