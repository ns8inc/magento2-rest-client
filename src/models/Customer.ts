import { Address, ExtensionAttributes } from '.';

export interface Customer {
  id: number;
  group_id: number;
  default_billing: string;
  default_shipping: string;
  created_at: Date;
  updated_at: Date;
  created_in: string;
  dob: Date;
  email: string;
  firstname: string;
  lastname: string;
  gender: number;
  store_id: number;
  website_id: number;
  addresses: Address[];
  disable_auto_group_change: number;
  extension_attributes: ExtensionAttributes;
}