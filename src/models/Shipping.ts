import { Address } from '.';
export interface Shipping {
  address: Address;
  method: string;
  total: {
    [key: string]: number;
  };
}
