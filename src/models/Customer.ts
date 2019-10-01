import { Address, ExtensionAttributes, ParentItemClass, AttributeValueField } from '.';

export interface CustomerExtensionAttributes {
  amazon_id?: string;
  company_attributes?: CompanyAttributes;
  is_subscribed?: boolean;
  vertex_customer_code?: string;
}

export interface CompanyAttributes {
  company_id?: number;
  customer_id?: number;
  extension_attributes?: ParentItemClass;
  job_title?: string;
  status?: number;
  telephone?: string;
}

export interface Customer {
  addresses?: Address[];
  confirmation?: string;
  created_at?: string;
  created_in?: string;
  custom_attributes?: AttributeValueField[];
  default_billing?: string;
  default_shipping?: string;
  disable_auto_group_change?: number;
  dob?: string;
  email?: string;
  extension_attributes?: CustomerExtensionAttributes;
  firstname?: string;
  gender?: number;
  group_id?: number;
  id?: number;
  lastname?: string;
  middlename?: string;
  prefix?: string;
  store_id?: number;
  suffix?: string;
  taxvat?: string;
  updated_at?: string;
  website_id?: number;
}