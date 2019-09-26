import { Region } from '.';

export interface Address {
  address_type: string;
  city: string;
  country_id: string;
  customer_address_id?: number;
  email: string;
  entity_id: number;
  firstname: string;
  lastname: string;
  parent_id: number;
  postcode: string;
  region: Region;
  region_code: string;
  region_id: number;
  street: string[];
  telephone: string;
}
