import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Coworker } from './shared/entities/coworker';

@Injectable()
export class AppService {

  constructor() {
  }

  public getAllCoworkers(): Observable<Array<Coworker>> {
    const coworkers: Array<Coworker> = [
      new Coworker('Vincent', 'Nourry', {
        lat: 47.2609413,
        lng: -1.635126,
        streetNumber: '22',
        streetName: 'rue d\'Altaïr',
        zip: '44700',
        city: 'Orvault',
        country: 'France'
      }, '1409', 'vincent.nourry@orange.com'),
      new Coworker('Daniel', 'Nourry', {
        lat: 46.9601832,
        lng: -1.1209214,
        streetNumber: '27',
        streetName: 'rue de la Vendée',
        zip: '85130',
        city: 'Les Landes-Genusson',
        country: 'France'
      }, '0251916380', 'daniel.nourry20@orange.fr'),
      new Coworker('Waldemar', 'Kita', {
        lat: 47.2560232,
        lng: -1.5246749,
        streetName: 'boulevard de la Beaujoire',
        zip: '44000',
        city: 'Nantes',
        country: 'France'
      }, '0109658432', 'kita.cassetoi@fcn.com'),
      new Coworker('Jack', 'Brelon', {
        lat: 47.23836300000001,
        lng: -1.5695302,
        streetNumber: '63',
        streetName: 'rue Léon Jost',
        zip: '44700',
        city: 'Orvault',
        country: 'France'
      }, '0670879531', 'vincent.nourry@accenture.com'),
      new Coworker('Vince', 'N.', {
        lat: 47.2646625,
        lng: -1.623863,
        streetNumber: '10',
        streetName: 'rue de l\'Ouche Cormier',
        zip: '44700',
        city: 'Orvault',
        country: 'France'
      }, '0670879531', 'v.nourry@gmail.com')
    ];
    return Observable.of(coworkers);
  }

}
