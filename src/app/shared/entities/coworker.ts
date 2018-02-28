import { Address } from './address';

export interface Coworker {
  firstName: string;
  lastName: string;
  tel?: string;
  email?: string;
  address: Address;
}
