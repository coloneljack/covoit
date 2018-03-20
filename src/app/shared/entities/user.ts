import { Address } from './address';

export interface User {
  firstName: string;
  lastName: string;
  tel?: string;
  email?: string;
  job?: string;
  type?: string;
  seats?: number;
  workingHours?: string;
  address?: Address;
}
