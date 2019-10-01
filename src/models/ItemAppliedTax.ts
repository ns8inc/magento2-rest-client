import { AppliedTax, ParentItemClass } from '.';
export interface ItemAppliedTax {
  type?: string;
  item_id?: number;
  associated_item_id?: number;
  applied_taxes?: AppliedTax[];
  extension_attributes?: ParentItemClass;
}
