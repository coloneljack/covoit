import { Address } from './address';

export class Coworker {
  constructor(public firstName: string, public lastName: string, public address: Address, public tel?: string, public email?: string) {}

  get name(): string {
    return this.firstName + ' ' + this.lastName;
  }
}
