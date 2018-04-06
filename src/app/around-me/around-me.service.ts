import { GoogleMapsAPIWrapper } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Address } from '../shared/entities/address';
import { RouteDetails } from '../shared/entities/route-details';
import { User } from '../shared/entities/user';
import { GmapsService } from '../shared/services/gmaps.service';

declare const google: any;

@Injectable()
export class AroundMeService {

  constructor(private http: HttpClient, private gmapsApi: GoogleMapsAPIWrapper, private gmapsService: GmapsService) {}

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

  public getAllUsers(): Observable<Array<User>> {
    const users: Array<User> = [
      {
        firstName: 'Daniel',
        lastName: 'Nourry',
        job: 'Coupeur en confection',
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
        job: 'Escroc (et PDG à ses heures perdues)',
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
        job: 'Pilote de 125cc',
        tel: '0670879531',
        email: 'jack@brelon.net',
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
        firstName: 'V.',
        lastName: 'Nourry',
        job: 'Ingénieur concepteur',
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

    return Observable.of(users);
  }

  public getRouteDetailsOfClosestWaypoint(origin: Address, destination: Address, waypoints: Array<Address>): Observable<RouteDetails> {
    const waypointsRouteDetails = waypoints.map(w => this.getWaypointMinRouteDetails(origin, destination, w));
    return Observable.merge(waypointsRouteDetails).mergeAll().min(this.getMinRoute);
  }

  private getWaypointMinRouteDetails(origin: Address, destination: Address, waypoint: Address): Observable<RouteDetails> {
    return this.gmapsService.getRouteDetails(origin, destination, [waypoint])
      .merge(this.gmapsService.getRouteDetails(waypoint, destination, [origin]))
      .min(this.getMinRoute);
  }

  private getMinRoute(r1: RouteDetails, r2: RouteDetails): number {
    return r1.duration < r2.duration ? -1 : 1;
  }
}
