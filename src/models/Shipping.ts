import { Address } from "./Address";
export interface Shipping {
  address: Address;
  method: string;
  total: {
    [key: string]: number;
  };
}
