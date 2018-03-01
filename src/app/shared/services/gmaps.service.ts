import { Injectable } from '@angular/core';
import * as GMaps from '@google/maps';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { Address } from '../entities/address';

@Injectable()
export class GmapsService {

  private googleMapsClient: any;

  constructor() {
    this.googleMapsClient = GMaps.createClient({
      key: environment.GOOGLE_MAPS_API_KEY
    });
  }

  public getPotentialLocations(address: string): Observable<Array<Address>> {
    return new Observable(observer => {
      this.googleMapsClient.geocode({address}, (err, response) => {
        if (err) {
          observer.error(err);
        } else {
          const result = response.json;
          if (result.status === 'OK') {
            observer.next(result.results.map(r => {
              const streetNumber = r.address_components.find(c => c.types.indexOf('street_number') !== -1);
              const streetName = r.address_components.find(c => c.types.indexOf('route') !== -1);
              const zip = r.address_components.find(c => c.types.indexOf('postal_code') !== -1);
              const city = r.address_components.find(c => c.types.indexOf('locality') !== -1);
              const country = r.address_components.find(c => c.types.indexOf('country') !== -1);
              return {
                'lat': r.geometry.location.lat,
                'lng': r.geometry.location.lng,
                'streetNumber': streetNumber ? streetNumber.long_name : undefined,
                'streetName': streetName ? streetName.long_name : undefined,
                'zip': zip ? zip.long_name : undefined,
                'city': city ? city.long_name : undefined,
                'country': country ? country.long_name : undefined
              };
            }));
          } else {
            observer.error(result.status);
          }
        }
      });
    });
  }

  public getRoute(origin: Address, destination: Address, waypoints?: Array<Address>): void {
    this.googleMapsClient.directions({
      origin,
      destination,
      mode: 'driving',
      units: 'metric'
    }, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log(response);
      }
    });
  }

}
