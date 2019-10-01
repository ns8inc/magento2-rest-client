import { ShippingAssignment, PaymentAdditionalInfo, AppliedTax, ItemAppliedTax } from '.';

export interface AmazonOrderReferenceID {
  amazon_order_reference_id?: string;
  order_id?: number;
}

export interface ParentItemClass {
}

export interface CompanyOrderAttributes {
  order_id?: number;
  company_id?: number;
  company_name?: string;
  extension_attributes?: ParentItemClass;
}

export interface GiftCard {
  id?: number;
  code?: string;
  amount?: number;
  base_amount?: number;
}

export interface GiftMessage {
  gift_message_id?: number;
  customer_id?: number;
  sender?: string;
  recipient?: string;
  message?: string;
  extension_attributes?: GiftMessageExtensionAttributes;
}

export interface GiftMessageExtensionAttributes {
  entity_id?: string;
  entity_type?: string;
  wrapping_id?: number;
  wrapping_allow_gift_receipt?: boolean;
  wrapping_add_printed_card?: boolean;
}

export interface ItemExtensionAttributes {
  amazon_order_reference_id?: AmazonOrderReferenceID;
  applied_taxes?: AppliedTax[];
  base_customer_balance_amount?: number;
  base_customer_balance_invoiced?: number;
  base_customer_balance_refunded?: number;
  base_customer_balance_total_refunded?: number;
  base_gift_cards_amount?: number;
  base_gift_cards_invoiced?: number;
  base_gift_cards_refunded?: number;
  base_reward_currency_amount?: number;
  company_order_attributes?: CompanyOrderAttributes;
  converting_from_quote?: boolean;
  customer_balance_amount?: number;
  customer_balance_invoiced?: number;
  customer_balance_refunded?: number;
  customer_balance_total_refunded?: number;
  gift_cards_amount?: number;
  gift_cards_invoiced?: number;
  gift_cards_refunded?: number;
  gift_cards?: GiftCard[];
  gift_message?: GiftMessage;
  gw_add_card?: string;
  gw_allow_gift_receipt?: string;
  gw_base_price_incl_tax?: string;
  gw_base_price_invoiced?: string;
  gw_base_price_refunded?: string;
  gw_base_price?: string;
  gw_base_tax_amount_invoiced?: string;
  gw_base_tax_amount_refunded?: string;
  gw_base_tax_amount?: string;
  gw_card_base_price_incl_tax?: string;
  gw_card_base_price_invoiced?: string;
  gw_card_base_price_refunded?: string;
  gw_card_base_price?: string;
  gw_card_base_tax_amount?: string;
  gw_card_base_tax_invoiced?: string;
  gw_card_base_tax_refunded?: string;
  gw_card_price_incl_tax?: string;
  gw_card_price_invoiced?: string;
  gw_card_price_refunded?: string;
  gw_card_price?: string;
  gw_card_tax_amount?: string;
  gw_card_tax_invoiced?: string;
  gw_card_tax_refunded?: string;
  gw_id?: string;
  gw_items_base_price_incl_tax?: string;
  gw_items_base_price_invoiced?: string;
  gw_items_base_price_refunded?: string;
  gw_items_base_price?: string;
  gw_items_base_tax_amount?: string;
  gw_items_base_tax_invoiced?: string;
  gw_items_base_tax_refunded?: string;
  gw_items_price_incl_tax?: string;
  gw_items_price_invoiced?: string;
  gw_items_price_refunded?: string;
  gw_items_price?: string;
  gw_items_tax_amount?: string;
  gw_items_tax_invoiced?: string;
  gw_items_tax_refunded?: string;
  gw_price_incl_tax?: string;
  gw_price_invoiced?: string;
  gw_price_refunded?: string;
  gw_price?: string;
  gw_tax_amount_invoiced?: string;
  gw_tax_amount_refunded?: string;
  gw_tax_amount?: string;
  item_applied_taxes?: ItemAppliedTax[];
  payment_additional_info?: PaymentAdditionalInfo[];
  reward_currency_amount?: number;
  reward_points_balance?: number;
  shipping_assignments?: ShippingAssignment[];
}
