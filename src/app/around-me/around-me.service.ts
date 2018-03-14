import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Address } from '../shared/entities/address';

@Injectable()
export class AroundMeService {

  constructor(private http: HttpClient) {}

  public getWorkLocation(): Observable<Address> {
    return Observable.of({
      lat: 47.2753091,
      lng: -1.51228,
      title: 'OAB Nantes',
      streetNumber: '9',
      streetName: 'boulevard Nicéphore Niépce',
      zip: '44300',
      city: 'Nantes',
      country: 'France'
    });
  }

  public getAllCoworkerAddresses(): Observable<Array<Address>> {
    const coworkerAddresses: Array<Address> = [
      {
        lat: 47.2609413,
        lng: -1.635126,
        streetNumber: '22',
        streetName: 'rue d\'Altaïr',
        zip: '44700',
        city: 'Orvault',
        country: 'France',
        coworker: {
          firstName: 'Vincent',
          lastName: 'Nourry',
          job: 'Ingénieur concepteur confirmé',
          tel: '1409',
          email: 'vincent.nourry@orange.com'
        }
      },
      {
        lat: 46.9601832,
        lng: -1.1209214,
        streetNumber: '27',
        streetName: 'rue de la Vendée',
        zip: '85130',
        city: 'Les Landes-Genusson',
        country: 'France',
        coworker: {
          firstName: 'Daniel',
          lastName: 'Nourry',
          job: 'Coupeur en confection',
          tel: '0251916380',
          email: 'daniel.nourry20@orange.fr'
        }
      },
      {
        lat: 47.2560232,
        lng: -1.5246749,
        streetName: 'boulevard de la Beaujoire',
        zip: '44000',
        city: 'Nantes',
        country: 'France',
        coworker: {
          firstName: 'Waldemar',
          lastName: 'Kita',
          job: 'Escroc (et PDG à ses heures perdues)',
          tel: '0109658432',
          email: 'kita.cassetoi@fcn.com'
        }
      },
      {
        lat: 47.23836300000001,
        lng: -1.5695302,
        streetNumber: '63',
        streetName: 'rue Léon Jost',
        zip: '44700',
        city: 'Orvault',
        country: 'France',
        coworker: {
          firstName: 'Jack',
          lastName: 'Brelon',
          job: 'Pilote de 125cc',
          tel: '0670879531',
          email: 'jack@brelon.net'
        }
      },
      {
        lat: 47.2646625,
        lng: -1.623863,
        streetNumber: '10',
        streetName: 'rue de l\'Ouche Cormier',
        zip: '44700',
        city: 'Orvault',
        country: 'France',
        coworker: {
          firstName: 'V.',
          lastName: 'Nourry',
          job: 'Ingénieur concepteur',
          tel: '0670879531',
          email: 'v.nourry@gmail.com'
        }
      }
    ];

    return Observable.of(coworkerAddresses);
  }

}
