import { Address } from './address';
import { WorkingWeek } from './working-hours';

export interface User {
  firstName: string;
  lastName: string;
  tel?: string;
  email?: string;
  job?: string;
  type?: string;
  seats?: number;
  workingWeek?: WorkingWeek;
  address?: Address;
}
