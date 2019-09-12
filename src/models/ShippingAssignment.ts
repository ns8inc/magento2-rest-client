import { Shipping } from "./Shipping";
import { ParentItemElement } from "./ParentItemElement";
export interface ShippingAssignment {
  shipping: Shipping;
  items: ParentItemElement[];
}
