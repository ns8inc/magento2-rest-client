import { AppliedTax } from '.';
export interface ItemAppliedTax {
  type: string;
  applied_taxes: AppliedTax[];
  item_id?: number;
}
