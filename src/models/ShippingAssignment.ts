import { Item, Shipping, ParentItemClass } from '.';
export interface ShippingAssignment {
  extension_attributes?: ParentItemClass;
  items?: Item[];
  shipping?: Shipping;
  stock_id?: number;
}
