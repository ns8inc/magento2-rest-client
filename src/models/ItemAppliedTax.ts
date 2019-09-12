import { AppliedTax } from "./AppliedTax";
export interface ItemAppliedTax {
  type: string;
  applied_taxes: AppliedTax[];
  item_id?: number;
}
