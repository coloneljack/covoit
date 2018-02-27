import { Injectable } from '@angular/core';
import * as GMaps from '@google/maps';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GmapsService {

  private googleMapsClient: any;

  constructor() {
    this.googleMapsClient = GMaps.createClient({
      key: environment.GOOGLE_MAPS_API_KEY
    });
  }

  public getPotentialLocations(address: string): Observable<Array<any>> {
    return new Observable(observer => {
      this.googleMapsClient.geocode({address}, (err, response) => {
        if (err) {
          observer.error(err);
        } else {
          const result = response.json;
          if (result.status === 'OK') {
            observer.next(result.results.map(r => r.geometry.location));
          } else {
            observer.error(result.status);
          }
        }
      });
    });
  }

}
