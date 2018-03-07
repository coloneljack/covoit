import { Address } from './address';

export class Coworker {
  constructor(public firstName: string, public lastName: string, public address: Address, public tel?: string, public email?: string,
              public job = 'Ingénieur concepteur') {}

  get name(): string {
    return this.firstName + ' ' + this.lastName;
  }
}
