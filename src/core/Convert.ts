import { Order, OrderData } from '../models/Order';
import { Address } from '../models/Address';
import { ItemExtensionAttributes } from '../models/ItemExtensionAttributes';
import { AppliedTax } from '../models/AppliedTax';
import { ItemAppliedTax } from '../models/ItemAppliedTax';
import { PaymentAdditionalInfo } from '../models/PaymentAdditionalInfo';
import { ShippingAssignment } from '../models/ShippingAssignment';
import { ParentItemElement } from '../models/ParentItemElement';
import { ProductOption } from '../models/ProductOption';
import { ProductOptionExtensionAttributes } from '../models/ProductOptionExtensionAttributes';
import { ConfigurableItemOption } from '../models/ConfigurableItemOption';
import { Shipping } from '../models/Shipping';
import { Payment } from '../models/Payment';
import { StatusHistory } from '../models/StatusHistory';
import { SearchCriteria } from '../models/SearchCriteria';

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export default class Convert {
  public static toOrderData(json: string): OrderData {
    return cast(JSON.parse(json), r('OrderData'));
  }

  public static orderDataToJson(value: OrderData): string {
    return JSON.stringify(uncast(value, r('OrderData')), null, 2);
  }

  public static toOrder(json: string): Order {
    return cast(JSON.parse(json), r('Order'));
  }

  public static orderToJson(value: Order): string {
    return JSON.stringify(uncast(value, r('Order')), null, 2);
  }

  public static toAddress(json: string): Address {
    return cast(JSON.parse(json), r('Address'));
  }

  public static addressToJson(value: Address): string {
    return JSON.stringify(uncast(value, r('Address')), null, 2);
  }

  public static toItemExtensionAttributes(json: string): ItemExtensionAttributes {
    return cast(JSON.parse(json), r('ItemExtensionAttributes'));
  }

  public static itemExtensionAttributesToJson(value: ItemExtensionAttributes): string {
    return JSON.stringify(uncast(value, r('ItemExtensionAttributes')), null, 2);
  }

  public static toAppliedTax(json: string): AppliedTax {
    return cast(JSON.parse(json), r('AppliedTax'));
  }

  public static appliedTaxToJson(value: AppliedTax): string {
    return JSON.stringify(uncast(value, r('AppliedTax')), null, 2);
  }

  public static toItemAppliedTax(json: string): ItemAppliedTax {
    return cast(JSON.parse(json), r('ItemAppliedTax'));
  }

  public static itemAppliedTaxToJson(value: ItemAppliedTax): string {
    return JSON.stringify(uncast(value, r('ItemAppliedTax')), null, 2);
  }

  public static toPaymentAdditionalInfo(json: string): PaymentAdditionalInfo {
    return cast(JSON.parse(json), r('PaymentAdditionalInfo'));
  }

  public static paymentAdditionalInfoToJson(value: PaymentAdditionalInfo): string {
    return JSON.stringify(uncast(value, r('PaymentAdditionalInfo')), null, 2);
  }

  public static toShippingAssignment(json: string): ShippingAssignment {
    return cast(JSON.parse(json), r('ShippingAssignment'));
  }

  public static shippingAssignmentToJson(value: ShippingAssignment): string {
    return JSON.stringify(uncast(value, r('ShippingAssignment')), null, 2);
  }

  public static toParentItemElement(json: string): ParentItemElement {
    return cast(JSON.parse(json), r('ParentItemElement'));
  }

  public static parentItemElementToJson(value: ParentItemElement): string {
    return JSON.stringify(uncast(value, r('ParentItemElement')), null, 2);
  }

  public static toProductOption(json: string): ProductOption {
    return cast(JSON.parse(json), r('ProductOption'));
  }

  public static productOptionToJson(value: ProductOption): string {
    return JSON.stringify(uncast(value, r('ProductOption')), null, 2);
  }

  public static toProductOptionExtensionAttributes(json: string): ProductOptionExtensionAttributes {
    return cast(JSON.parse(json), r('ProductOptionExtensionAttributes'));
  }

  public static productOptionExtensionAttributesToJson(value: ProductOptionExtensionAttributes): string {
    return JSON.stringify(uncast(value, r('ProductOptionExtensionAttributes')), null, 2);
  }

  public static toConfigurableItemOption(json: string): ConfigurableItemOption {
    return cast(JSON.parse(json), r('ConfigurableItemOption'));
  }

  public static configurableItemOptionToJson(value: ConfigurableItemOption): string {
    return JSON.stringify(uncast(value, r('ConfigurableItemOption')), null, 2);
  }

  public static toShipping(json: string): Shipping {
    return cast(JSON.parse(json), r('Shipping'));
  }

  public static shippingToJson(value: Shipping): string {
    return JSON.stringify(uncast(value, r('Shipping')), null, 2);
  }

  public static toPayment(json: string): Payment {
    return cast(JSON.parse(json), r('Payment'));
  }

  public static paymentToJson(value: Payment): string {
    return JSON.stringify(uncast(value, r('Payment')), null, 2);
  }

  public static toStatusHistory(json: string): StatusHistory {
    return cast(JSON.parse(json), r('StatusHistory'));
  }

  public static statusHistoryToJson(value: StatusHistory): string {
    return JSON.stringify(uncast(value, r('StatusHistory')), null, 2);
  }

  public static toSearchCriteria(json: string): SearchCriteria {
    return cast(JSON.parse(json), r('SearchCriteria'));
  }

  public static searchCriteriaToJson(value: SearchCriteria): string {
    return JSON.stringify(uncast(value, r('SearchCriteria')), null, 2);
  }
}

function invalidValue(typ: any, val: any): never {
  throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    var map: any = {};
    typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    var map: any = {};
    typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    var l = typs.length;
    for (var i = 0; i < l; i++) {
      var typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) { }
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue('array', val);
    return val.map(el => transform(el, typ, getProps));
  }

  function transformDate(typ: any, val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue('Date', val);
    }
    return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val);
    }
    var result: any = {};
    Object.getOwnPropertyNames(props).forEach(key => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps);
    });
    Object.getOwnPropertyNames(val).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps);
      }
    });
    return result;
  }

  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers') ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems') ? transformArray(typ.arrayItems, val)
        : typ.hasOwnProperty('props') ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(typ, val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  'OrderData': o([
    { json: 'items', js: 'items', typ: a(r('Orders')) },
    { json: 'search_criteria', js: 'search_criteria', typ: r('SearchCriteria') },
    { json: 'total_count', js: 'total_count', typ: 0 },
  ], false),
  'Orders': o([
    { json: 'applied_rule_ids', js: 'applied_rule_ids', typ: u(undefined, '') },
    { json: 'base_currency_code', js: 'base_currency_code', typ: '' },
    { json: 'base_discount_amount', js: 'base_discount_amount', typ: 0 },
    { json: 'base_discount_invoiced', js: 'base_discount_invoiced', typ: u(undefined, 0) },
    { json: 'base_grand_total', js: 'base_grand_total', typ: 3.14 },
    { json: 'base_discount_tax_compensation_amount', js: 'base_discount_tax_compensation_amount', typ: 0 },
    { json: 'base_discount_tax_compensation_invoiced', js: 'base_discount_tax_compensation_invoiced', typ: u(undefined, 0) },
    { json: 'base_shipping_amount', js: 'base_shipping_amount', typ: 0 },
    { json: 'base_shipping_discount_amount', js: 'base_shipping_discount_amount', typ: 0 },
    { json: 'base_shipping_discount_tax_compensation_amnt', js: 'base_shipping_discount_tax_compensation_amnt', typ: 0 },
    { json: 'base_shipping_incl_tax', js: 'base_shipping_incl_tax', typ: 0 },
    { json: 'base_shipping_invoiced', js: 'base_shipping_invoiced', typ: u(undefined, 0) },
    { json: 'base_shipping_tax_amount', js: 'base_shipping_tax_amount', typ: 0 },
    { json: 'base_subtotal', js: 'base_subtotal', typ: 3.14 },
    { json: 'base_subtotal_incl_tax', js: 'base_subtotal_incl_tax', typ: 3.14 },
    { json: 'base_subtotal_invoiced', js: 'base_subtotal_invoiced', typ: u(undefined, 0) },
    { json: 'base_tax_amount', js: 'base_tax_amount', typ: 3.14 },
    { json: 'base_tax_invoiced', js: 'base_tax_invoiced', typ: u(undefined, 3.14) },
    { json: 'base_total_due', js: 'base_total_due', typ: 3.14 },
    { json: 'base_total_invoiced', js: 'base_total_invoiced', typ: u(undefined, 3.14) },
    { json: 'base_total_invoiced_cost', js: 'base_total_invoiced_cost', typ: u(undefined, 0) },
    { json: 'base_total_paid', js: 'base_total_paid', typ: u(undefined, 3.14) },
    { json: 'base_to_global_rate', js: 'base_to_global_rate', typ: 0 },
    { json: 'base_to_order_rate', js: 'base_to_order_rate', typ: 0 },
    { json: 'billing_address_id', js: 'billing_address_id', typ: 0 },
    { json: 'created_at', js: 'created_at', typ: Date },
    { json: 'customer_dob', js: 'customer_dob', typ: u(undefined, Date) },
    { json: 'customer_email', js: 'customer_email', typ: '' },
    { json: 'customer_firstname', js: 'customer_firstname', typ: '' },
    { json: 'customer_gender', js: 'customer_gender', typ: u(undefined, 0) },
    { json: 'customer_group_id', js: 'customer_group_id', typ: 0 },
    { json: 'customer_id', js: 'customer_id', typ: 0 },
    { json: 'customer_is_guest', js: 'customer_is_guest', typ: 0 },
    { json: 'customer_lastname', js: 'customer_lastname', typ: '' },
    { json: 'customer_note_notify', js: 'customer_note_notify', typ: 0 },
    { json: 'discount_amount', js: 'discount_amount', typ: 0 },
    { json: 'discount_invoiced', js: 'discount_invoiced', typ: u(undefined, 0) },
    { json: 'entity_id', js: 'entity_id', typ: 0 },
    { json: 'global_currency_code', js: 'global_currency_code', typ: '' },
    { json: 'grand_total', js: 'grand_total', typ: 3.14 },
    { json: 'discount_tax_compensation_amount', js: 'discount_tax_compensation_amount', typ: 0 },
    { json: 'discount_tax_compensation_invoiced', js: 'discount_tax_compensation_invoiced', typ: u(undefined, 0) },
    { json: 'increment_id', js: 'increment_id', typ: '' },
    { json: 'is_virtual', js: 'is_virtual', typ: 0 },
    { json: 'order_currency_code', js: 'order_currency_code', typ: '' },
    { json: 'protect_code', js: 'protect_code', typ: '' },
    { json: 'quote_id', js: 'quote_id', typ: 0 },
    { json: 'shipping_amount', js: 'shipping_amount', typ: 0 },
    { json: 'shipping_description', js: 'shipping_description', typ: '' },
    { json: 'shipping_discount_amount', js: 'shipping_discount_amount', typ: 0 },
    { json: 'shipping_discount_tax_compensation_amount', js: 'shipping_discount_tax_compensation_amount', typ: 0 },
    { json: 'shipping_incl_tax', js: 'shipping_incl_tax', typ: 0 },
    { json: 'shipping_invoiced', js: 'shipping_invoiced', typ: u(undefined, 0) },
    { json: 'shipping_tax_amount', js: 'shipping_tax_amount', typ: 0 },
    { json: 'state', js: 'state', typ: '' },
    { json: 'status', js: 'status', typ: '' },
    { json: 'store_currency_code', js: 'store_currency_code', typ: '' },
    { json: 'store_id', js: 'store_id', typ: 0 },
    { json: 'store_name', js: 'store_name', typ: '' },
    { json: 'store_to_base_rate', js: 'store_to_base_rate', typ: 0 },
    { json: 'store_to_order_rate', js: 'store_to_order_rate', typ: 0 },
    { json: 'subtotal', js: 'subtotal', typ: 3.14 },
    { json: 'subtotal_incl_tax', js: 'subtotal_incl_tax', typ: 3.14 },
    { json: 'subtotal_invoiced', js: 'subtotal_invoiced', typ: u(undefined, 0) },
    { json: 'tax_amount', js: 'tax_amount', typ: 3.14 },
    { json: 'tax_invoiced', js: 'tax_invoiced', typ: u(undefined, 3.14) },
    { json: 'total_due', js: 'total_due', typ: 3.14 },
    { json: 'total_invoiced', js: 'total_invoiced', typ: u(undefined, 3.14) },
    { json: 'total_item_count', js: 'total_item_count', typ: 0 },
    { json: 'total_paid', js: 'total_paid', typ: u(undefined, 3.14) },
    { json: 'total_qty_ordered', js: 'total_qty_ordered', typ: 0 },
    { json: 'updated_at', js: 'updated_at', typ: Date },
    { json: 'weight', js: 'weight', typ: 0 },
    { json: 'items', js: 'items', typ: a(r('ParentItemElement')) },
    { json: 'billing_address', js: 'billing_address', typ: r('Address') },
    { json: 'payment', js: 'payment', typ: r('Payment') },
    { json: 'status_histories', js: 'status_histories', typ: a(r('StatusHistory')) },
    { json: 'extension_attributes', js: 'extension_attributes', typ: r('ItemExtensionAttributes') },
    { json: 'adjustment_negative', js: 'adjustment_negative', typ: u(undefined, 0) },
    { json: 'adjustment_positive', js: 'adjustment_positive', typ: u(undefined, 0) },
    { json: 'base_adjustment_negative', js: 'base_adjustment_negative', typ: u(undefined, 0) },
    { json: 'base_adjustment_positive', js: 'base_adjustment_positive', typ: u(undefined, 0) },
    { json: 'base_discount_refunded', js: 'base_discount_refunded', typ: u(undefined, 0) },
    { json: 'base_discount_tax_compensation_refunded', js: 'base_discount_tax_compensation_refunded', typ: u(undefined, 0) },
    { json: 'base_shipping_refunded', js: 'base_shipping_refunded', typ: u(undefined, 0) },
    { json: 'base_shipping_tax_refunded', js: 'base_shipping_tax_refunded', typ: u(undefined, 0) },
    { json: 'base_subtotal_refunded', js: 'base_subtotal_refunded', typ: u(undefined, 0) },
    { json: 'base_tax_refunded', js: 'base_tax_refunded', typ: u(undefined, 3.14) },
    { json: 'base_total_offline_refunded', js: 'base_total_offline_refunded', typ: u(undefined, 3.14) },
    { json: 'base_total_refunded', js: 'base_total_refunded', typ: u(undefined, 3.14) },
    { json: 'discount_refunded', js: 'discount_refunded', typ: u(undefined, 0) },
    { json: 'discount_tax_compensation_refunded', js: 'discount_tax_compensation_refunded', typ: u(undefined, 0) },
    { json: 'shipping_refunded', js: 'shipping_refunded', typ: u(undefined, 0) },
    { json: 'shipping_tax_refunded', js: 'shipping_tax_refunded', typ: u(undefined, 0) },
    { json: 'subtotal_refunded', js: 'subtotal_refunded', typ: u(undefined, 0) },
    { json: 'tax_refunded', js: 'tax_refunded', typ: u(undefined, 3.14) },
    { json: 'total_offline_refunded', js: 'total_offline_refunded', typ: u(undefined, 3.14) },
    { json: 'total_refunded', js: 'total_refunded', typ: u(undefined, 3.14) },
    { json: 'email_sent', js: 'email_sent', typ: u(undefined, 0) },
    { json: 'remote_ip', js: 'remote_ip', typ: u(undefined, '') },
    { json: 'base_discount_canceled', js: 'base_discount_canceled', typ: u(undefined, 0) },
    { json: 'base_shipping_canceled', js: 'base_shipping_canceled', typ: u(undefined, 0) },
    { json: 'base_subtotal_canceled', js: 'base_subtotal_canceled', typ: u(undefined, 0) },
    { json: 'base_tax_canceled', js: 'base_tax_canceled', typ: u(undefined, 3.14) },
    { json: 'base_total_canceled', js: 'base_total_canceled', typ: u(undefined, 3.14) },
    { json: 'discount_canceled', js: 'discount_canceled', typ: u(undefined, 0) },
    { json: 'edit_increment', js: 'edit_increment', typ: u(undefined, 0) },
    { json: 'relation_child_id', js: 'relation_child_id', typ: u(undefined, '') },
    { json: 'relation_child_real_id', js: 'relation_child_real_id', typ: u(undefined, '') },
    { json: 'shipping_canceled', js: 'shipping_canceled', typ: u(undefined, 0) },
    { json: 'subtotal_canceled', js: 'subtotal_canceled', typ: u(undefined, 0) },
    { json: 'tax_canceled', js: 'tax_canceled', typ: u(undefined, 3.14) },
    { json: 'total_canceled', js: 'total_canceled', typ: u(undefined, 3.14) },
    { json: 'original_increment_id', js: 'original_increment_id', typ: u(undefined, '') },
    { json: 'relation_parent_id', js: 'relation_parent_id', typ: u(undefined, '') },
    { json: 'relation_parent_real_id', js: 'relation_parent_real_id', typ: u(undefined, '') },
  ], false),
  'Address': o([
    { json: 'address_type', js: 'address_type', typ: '' },
    { json: 'city', js: 'city', typ: '' },
    { json: 'country_id', js: 'country_id', typ: '' },
    { json: 'customer_address_id', js: 'customer_address_id', typ: u(undefined, 0) },
    { json: 'email', js: 'email', typ: '' },
    { json: 'entity_id', js: 'entity_id', typ: 0 },
    { json: 'firstname', js: 'firstname', typ: '' },
    { json: 'lastname', js: 'lastname', typ: '' },
    { json: 'parent_id', js: 'parent_id', typ: 0 },
    { json: 'postcode', js: 'postcode', typ: '' },
    { json: 'region', js: 'region', typ: '' },
    { json: 'region_code', js: 'region_code', typ: '' },
    { json: 'region_id', js: 'region_id', typ: 0 },
    { json: 'street', js: 'street', typ: a('') },
    { json: 'telephone', js: 'telephone', typ: '' },
  ], false),
  'ItemExtensionAttributes': o([
    { json: 'shipping_assignments', js: 'shipping_assignments', typ: a(r('ShippingAssignment')) },
    { json: 'payment_additional_info', js: 'payment_additional_info', typ: a(r('PaymentAdditionalInfo')) },
    { json: 'applied_taxes', js: 'applied_taxes', typ: a(r('AppliedTax')) },
    { json: 'item_applied_taxes', js: 'item_applied_taxes', typ: a(r('ItemAppliedTax')) },
    { json: 'converting_from_quote', js: 'converting_from_quote', typ: u(undefined, true) },
  ], false),
  'AppliedTax': o([
    { json: 'code', js: 'code', typ: '' },
    { json: 'title', js: 'title', typ: '' },
    { json: 'percent', js: 'percent', typ: 3.14 },
    { json: 'amount', js: 'amount', typ: 3.14 },
    { json: 'base_amount', js: 'base_amount', typ: 3.14 },
  ], false),
  'ItemAppliedTax': o([
    { json: 'type', js: 'type', typ: '' },
    { json: 'applied_taxes', js: 'applied_taxes', typ: a(r('AppliedTax')) },
    { json: 'item_id', js: 'item_id', typ: u(undefined, 0) },
  ], false),
  'PaymentAdditionalInfo': o([
    { json: 'key', js: 'key', typ: '' },
    { json: 'value', js: 'value', typ: '' },
  ], false),
  'ShippingAssignment': o([
    { json: 'shipping', js: 'shipping', typ: r('Shipping') },
    { json: 'items', js: 'items', typ: a(r('ParentItemElement')) },
  ], false),
  'ParentItemElement': o([
    { json: 'amount_refunded', js: 'amount_refunded', typ: 0 },
    { json: 'applied_rule_ids', js: 'applied_rule_ids', typ: u(undefined, '') },
    { json: 'base_amount_refunded', js: 'base_amount_refunded', typ: 0 },
    { json: 'base_discount_amount', js: 'base_discount_amount', typ: 0 },
    { json: 'base_discount_invoiced', js: 'base_discount_invoiced', typ: 0 },
    { json: 'base_discount_tax_compensation_amount', js: 'base_discount_tax_compensation_amount', typ: u(undefined, 0) },
    { json: 'base_discount_tax_compensation_invoiced', js: 'base_discount_tax_compensation_invoiced', typ: u(undefined, 0) },
    { json: 'base_original_price', js: 'base_original_price', typ: u(undefined, 3.14) },
    { json: 'base_price', js: 'base_price', typ: 3.14 },
    { json: 'base_price_incl_tax', js: 'base_price_incl_tax', typ: u(undefined, 3.14) },
    { json: 'base_row_invoiced', js: 'base_row_invoiced', typ: 0 },
    { json: 'base_row_total', js: 'base_row_total', typ: 3.14 },
    { json: 'base_row_total_incl_tax', js: 'base_row_total_incl_tax', typ: 3.14 },
    { json: 'base_tax_amount', js: 'base_tax_amount', typ: 3.14 },
    { json: 'base_tax_invoiced', js: 'base_tax_invoiced', typ: 3.14 },
    { json: 'created_at', js: 'created_at', typ: Date },
    { json: 'discount_amount', js: 'discount_amount', typ: 0 },
    { json: 'discount_invoiced', js: 'discount_invoiced', typ: 0 },
    { json: 'discount_percent', js: 'discount_percent', typ: 0 },
    { json: 'free_shipping', js: 'free_shipping', typ: 0 },
    { json: 'discount_tax_compensation_amount', js: 'discount_tax_compensation_amount', typ: u(undefined, 0) },
    { json: 'discount_tax_compensation_invoiced', js: 'discount_tax_compensation_invoiced', typ: u(undefined, 0) },
    { json: 'is_qty_decimal', js: 'is_qty_decimal', typ: 0 },
    { json: 'item_id', js: 'item_id', typ: 0 },
    { json: 'name', js: 'name', typ: '' },
    { json: 'no_discount', js: 'no_discount', typ: 0 },
    { json: 'order_id', js: 'order_id', typ: 0 },
    { json: 'original_price', js: 'original_price', typ: 3.14 },
    { json: 'price', js: 'price', typ: 3.14 },
    { json: 'price_incl_tax', js: 'price_incl_tax', typ: u(undefined, 3.14) },
    { json: 'product_id', js: 'product_id', typ: 0 },
    { json: 'product_type', js: 'product_type', typ: '' },
    { json: 'qty_canceled', js: 'qty_canceled', typ: 0 },
    { json: 'qty_invoiced', js: 'qty_invoiced', typ: 0 },
    { json: 'qty_ordered', js: 'qty_ordered', typ: 0 },
    { json: 'qty_refunded', js: 'qty_refunded', typ: 0 },
    { json: 'qty_shipped', js: 'qty_shipped', typ: 0 },
    { json: 'row_invoiced', js: 'row_invoiced', typ: 0 },
    { json: 'row_total', js: 'row_total', typ: 3.14 },
    { json: 'row_total_incl_tax', js: 'row_total_incl_tax', typ: 3.14 },
    { json: 'row_weight', js: 'row_weight', typ: 0 },
    { json: 'sku', js: 'sku', typ: '' },
    { json: 'store_id', js: 'store_id', typ: 0 },
    { json: 'tax_amount', js: 'tax_amount', typ: 3.14 },
    { json: 'tax_invoiced', js: 'tax_invoiced', typ: 3.14 },
    { json: 'tax_percent', js: 'tax_percent', typ: 3.14 },
    { json: 'updated_at', js: 'updated_at', typ: Date },
    { json: 'weight', js: 'weight', typ: u(undefined, 0) },
    { json: 'product_option', js: 'product_option', typ: u(undefined, r('ProductOption')) },
    { json: 'base_discount_refunded', js: 'base_discount_refunded', typ: u(undefined, 0) },
    { json: 'base_discount_tax_compensation_refunded', js: 'base_discount_tax_compensation_refunded', typ: u(undefined, 0) },
    { json: 'base_tax_refunded', js: 'base_tax_refunded', typ: u(undefined, 3.14) },
    { json: 'discount_refunded', js: 'discount_refunded', typ: u(undefined, 0) },
    { json: 'discount_tax_compensation_refunded', js: 'discount_tax_compensation_refunded', typ: u(undefined, 0) },
    { json: 'tax_refunded', js: 'tax_refunded', typ: u(undefined, 3.14) },
    { json: 'weee_tax_applied', js: 'weee_tax_applied', typ: u(undefined, '') },
    { json: 'is_virtual', js: 'is_virtual', typ: u(undefined, 0) },
    { json: 'quote_item_id', js: 'quote_item_id', typ: u(undefined, 0) },
    { json: 'discount_tax_compensation_canceled', js: 'discount_tax_compensation_canceled', typ: u(undefined, 0) },
    { json: 'tax_canceled', js: 'tax_canceled', typ: u(undefined, 3.14) },
    { json: 'parent_item_id', js: 'parent_item_id', typ: u(undefined, 0) },
    { json: 'parent_item', js: 'parent_item', typ: u(undefined, r('ParentItemElement')) },
  ], false),
  'ProductOption': o([
    { json: 'extension_attributes', js: 'extension_attributes', typ: r('ProductOptionExtensionAttributes') },
  ], false),
  'ProductOptionExtensionAttributes': o([
    { json: 'configurable_item_options', js: 'configurable_item_options', typ: a(r('ConfigurableItemOption')) },
  ], false),
  'ConfigurableItemOption': o([
    { json: 'option_id', js: 'option_id', typ: '' },
    { json: 'option_value', js: 'option_value', typ: 0 },
  ], false),
  'Shipping': o([
    { json: 'address', js: 'address', typ: r('Address') },
    { json: 'method', js: 'method', typ: '' },
    { json: 'total', js: 'total', typ: m(0) },
  ], false),
  'Payment': o([
    { json: 'account_status', js: 'account_status', typ: null },
    { json: 'additional_information', js: 'additional_information', typ: a('') },
    { json: 'amount_ordered', js: 'amount_ordered', typ: 3.14 },
    { json: 'amount_paid', js: 'amount_paid', typ: u(undefined, 3.14) },
    { json: 'base_amount_ordered', js: 'base_amount_ordered', typ: 3.14 },
    { json: 'base_amount_paid', js: 'base_amount_paid', typ: u(undefined, 3.14) },
    { json: 'base_shipping_amount', js: 'base_shipping_amount', typ: 0 },
    { json: 'base_shipping_captured', js: 'base_shipping_captured', typ: u(undefined, 0) },
    { json: 'cc_last4', js: 'cc_last4', typ: null },
    { json: 'entity_id', js: 'entity_id', typ: 0 },
    { json: 'method', js: 'method', typ: '' },
    { json: 'parent_id', js: 'parent_id', typ: 0 },
    { json: 'shipping_amount', js: 'shipping_amount', typ: 0 },
    { json: 'shipping_captured', js: 'shipping_captured', typ: u(undefined, 0) },
    { json: 'amount_refunded', js: 'amount_refunded', typ: u(undefined, 3.14) },
    { json: 'base_amount_refunded', js: 'base_amount_refunded', typ: u(undefined, 3.14) },
    { json: 'base_shipping_refunded', js: 'base_shipping_refunded', typ: u(undefined, 0) },
    { json: 'shipping_refunded', js: 'shipping_refunded', typ: u(undefined, 0) },
    { json: 'cc_exp_year', js: 'cc_exp_year', typ: u(undefined, '') },
    { json: 'cc_ss_start_month', js: 'cc_ss_start_month', typ: u(undefined, '') },
    { json: 'cc_ss_start_year', js: 'cc_ss_start_year', typ: u(undefined, '') },
  ], false),
  'StatusHistory': o([
    { json: 'comment', js: 'comment', typ: '' },
    { json: 'created_at', js: 'created_at', typ: Date },
    { json: 'entity_id', js: 'entity_id', typ: 0 },
    { json: 'entity_name', js: 'entity_name', typ: '' },
    { json: 'is_customer_notified', js: 'is_customer_notified', typ: 0 },
    { json: 'is_visible_on_front', js: 'is_visible_on_front', typ: 0 },
    { json: 'parent_id', js: 'parent_id', typ: 0 },
    { json: 'status', js: 'status', typ: '' },
  ], false),
  'SearchCriteria': o([
    { json: 'filter_groups', js: 'filter_groups', typ: a('any') },
  ], false),
};