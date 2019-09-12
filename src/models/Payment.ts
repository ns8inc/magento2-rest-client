export interface Payment {
  account_status: null;
  additional_information: string[];
  amount_ordered: number;
  amount_paid?: number;
  base_amount_ordered: number;
  base_amount_paid?: number;
  base_shipping_amount: number;
  base_shipping_captured?: number;
  cc_last4: null;
  entity_id: number;
  method: string;
  parent_id: number;
  shipping_amount: number;
  shipping_captured?: number;
  amount_refunded?: number;
  base_amount_refunded?: number;
  base_shipping_refunded?: number;
  shipping_refunded?: number;
  cc_exp_year?: string;
  cc_ss_start_month?: string;
  cc_ss_start_year?: string;
}
