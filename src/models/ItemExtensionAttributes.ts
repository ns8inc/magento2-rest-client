import { ShippingAssignment } from "./ShippingAssignment";
import { PaymentAdditionalInfo } from "./PaymentAdditionalInfo";
import { ItemAppliedTax } from "./ItemAppliedTax";
import { AppliedTax } from "./AppliedTax";
export interface ItemExtensionAttributes {
  shipping_assignments: ShippingAssignment[];
  payment_additional_info: PaymentAdditionalInfo[];
  applied_taxes: AppliedTax[];
  item_applied_taxes: ItemAppliedTax[];
  converting_from_quote?: boolean;
}
