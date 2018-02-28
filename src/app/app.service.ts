import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Coworker } from './shared/entities/coworker';

@Injectable()
export class AppService {

  constructor() {
  }

  public getAllCoworkers(): Observable<Array<Coworker>> {
    const coworkers: Array<Coworker> = [
      {
        firstName: 'Vincent',
        lastName: 'Nourry',
        tel: '1409',
        email: 'vincent.nourry@orange.com',
        address: {
          lat: 47.2609413,
          lng: -1.635126,
          streetNumber: '22',
          streetName: 'rue d\'Altaïr',
          zip: '44700',
          city: 'Orvault',
          country: 'France'
        }
      },
      {
        firstName: 'Daniel',
        lastName: 'Nourry',
        tel: '0251916380',
        email: 'daniel.nourry20@orange.fr',
        address: {
          lat: 46.9601832,
          lng: -1.1209214,
          streetNumber: '27',
          streetName: 'rue de la Vendée',
          zip: '85130',
          city: 'Les Landes-Genusson',
          country: 'France'
        }
      },
      {
        firstName: 'Waldemar',
        lastName: 'Kita',
        tel: '0109658432',
        email: 'kita.cassetoi@fcn.com',
        address: {
          lat: 47.2560232,
          lng: -1.5246749,
          streetName: 'boulevard de la Beaujoire',
          zip: '44000',
          city: 'Nantes',
          country: 'France'
        }
      },
      {
        firstName: 'Jack',
        lastName: 'Brelon',
        tel: '0670879531',
        email: 'vincent.nourry@accenture.com',
        address: {
          lat: 47.23836300000001,
          lng: -1.5695302,
          streetNumber: '63',
          streetName: 'rue Léon Jost',
          zip: '44700',
          city: 'Orvault',
          country: 'France'
        }
      },
      {
        firstName: 'Vince',
        lastName: 'N.',
        tel: '0670879531',
        email: 'v.nourry@gmail.com',
        address: {
          lat: 47.2646625,
          lng: -1.623863,
          streetNumber: '10',
          streetName: 'rue de l\'Ouche Cormier',
          zip: '44700',
          city: 'Orvault',
          country: 'France'
        }
      }
    ];
    return Observable.of(coworkers);
  }

}
