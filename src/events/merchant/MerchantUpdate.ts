import { FieldsValue, SectionEnum, StringArrayValue, StringValue } from '..';

export interface MerchantUpdate {
  section: SectionEnum;
  groups: MerchantUpdateGroups;
}

export interface MerchantUpdateGroupsValue {
  [key: string]: MechantUpdateProperties | undefined;
}

export interface MerchantUpdateGroups extends MerchantUpdateGroupsValue {
  browser_capabilities: MechantUpdateProperties | undefined;
  captcha: MechantUpdateProperties | undefined;
  contact: MechantUpdateProperties | undefined;
  cookie: MechantUpdateProperties | undefined;
  country: MechantUpdateProperties | undefined;
  dashboard: MechantUpdateProperties | undefined;
  default_layouts: MechantUpdateProperties | undefined;
  default: MechantUpdateProperties | undefined;
  email: MechantUpdateProperties | undefined;
  ident_custom1: MechantUpdateProperties | undefined;
  ident_custom2: MechantUpdateProperties | undefined;
  ident_general: MechantUpdateProperties | undefined;
  ident_sales: MechantUpdateProperties | undefined;
  ident_support: MechantUpdateProperties | undefined;
  locale: MechantUpdateProperties | undefined;
  region: MechantUpdateProperties | undefined;
  secure: MechantUpdateProperties | undefined;
  security: MechantUpdateProperties | undefined;
  seo: MechantUpdateProperties | undefined;
  session: MechantUpdateProperties | undefined;
  single_store_mode: MechantUpdateProperties | undefined;
  startup: MechantUpdateProperties | undefined;
  store_information: MechantUpdateProperties | undefined;
  unsecure: MechantUpdateProperties | undefined;
  url: MechantUpdateProperties | undefined;
}

export interface MechantUpdateProperties {
  fields: MerchantUpdateFields | undefined;
}

export interface MerchantUpdateFields extends FieldsValue {
  admin_account_sharing: StringValue | undefined;
  allow: StringValue | undefined;
  base_link_url: StringValue | undefined;
  base_media_url: StringValue | undefined;
  base_static_url: StringValue | undefined;
  base_url: StringValue | undefined;
  case_sensitive: StringValue | undefined;
  city: StringValue | undefined;
  cms_home_page: StringValue | undefined;
  cms_no_cookies: StringValue | undefined;
  cms_no_route: StringValue | undefined;
  code: StringValue | undefined;
  cookie_domain: StringValue | undefined;
  cookie_httponly: StringValue | undefined;
  cookie_lifetime: StringValue | undefined;
  cookie_path: StringValue | undefined;
  cookie_restriction: StringValue | undefined;
  cookies: StringValue | undefined;
  country_id: StringValue | undefined;
  default_category_layout: StringValue | undefined;
  default_cms_layout: StringValue | undefined;
  default_product_layout: StringValue | undefined;
  default: StringValue | undefined;
  destinations: StringValue | undefined;
  display_all: StringValue | undefined;
  email: StringValue | undefined;
  email_template: StringValue | undefined;
  enable_charts: StringValue | undefined;
  enable: StringValue | undefined;
  enabled: StringValue | undefined;
  eu_countries: StringValue | undefined;
  failed_attempts_login: StringValue | undefined;
  firstday: StringValue | undefined;
  font: StringValue | undefined;
  forgot_email_identity: StringValue | undefined;
  forgot_email_template: StringValue | undefined;
  forms: StringValue | undefined;
  front: StringValue | undefined;
  hours: StringValue | undefined;
  javascript: StringValue | undefined;
  length: StringValue | undefined;
  local_storage: StringValue | undefined;
  lockout_failures: StringValue | undefined;
  lockout_threshold: StringValue | undefined;
  max_number_password_reset_requests: StringValue | undefined;
  menu_item_id: StringValue | undefined;
  merchant_vat_number: StringValue | undefined;
  min_time_between_password_reset_requests: StringValue | undefined;
  mode: StringValue | undefined;
  name: StringValue | undefined;
  no_route: StringValue | undefined;
  offloader_header: StringValue | undefined;
  optional_zip_countries: StringValue | undefined;
  password_is_forced: StringValue | undefined;
  password_lifetime: StringValue | undefined;
  password_reset_link_expiration_period: StringValue | undefined;
  password_reset_protection_type: StringValue | undefined;
  phone: StringValue | undefined;
  postcode: StringValue | undefined;
  recipient_email: StringValue | undefined;
  redirect_to_base: StringValue | undefined;
  region_id: StringValue | undefined;
  sender_email_identity: StringValue | undefined;
  session_lifetime: StringValue | undefined;
  show_cms_breadcrumbs: StringValue | undefined;
  state_required: StringArrayValue | undefined;
  street_line1: StringValue | undefined;
  street_line2: StringValue | undefined;
  symbols: StringValue | undefined;
  timeout: StringValue | undefined;
  timezone: StringValue | undefined;
  use_case_sensitive_login: StringValue | undefined;
  use_custom_path: StringValue | undefined;
  use_custom: StringValue | undefined;
  use_form_key: StringValue | undefined;
  use_frontend_sid: StringValue | undefined;
  use_http_user_agent: StringValue | undefined;
  use_http_via: StringValue | undefined;
  use_http_x_forwarded_for: StringValue | undefined;
  use_in_adminhtml: StringValue | undefined;
  use_in_frontend: StringValue | undefined;
  use_remote_addr: StringValue | undefined;
  use_rewrites: StringValue | undefined;
  use_store: StringValue | undefined;
  user_notification_template: StringValue | undefined;
  weekend: StringValue | undefined;
  weight_unit: StringValue | undefined;
}