import { GoogleMapsAPIWrapper } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Address } from '../entities/address';

declare const google: any;

@Injectable()
export class GmapsService {

  private directionsService: any;

  constructor(private http: HttpClient, private gMapsApi: GoogleMapsAPIWrapper) {
    this.gMapsApi.getNativeMap().then(() => this.directionsService = new google.maps.DirectionsService);
  }

  public getPotentialLocations(address: string): Observable<Array<Address>> {
    return this.http.get<any>(`${environment.GOOGLE_MAPS_API_ROOT}/geocode/json`, {
      params: {
        key: environment.GOOGLE_MAPS_API_KEY,
        address
      },
      observe: 'body'
    }).map(result => {
      return result.results.map(r => {
        const streetNumber = r.address_components.find(c => c.types.indexOf('street_number') !== -1);
        const streetName = r.address_components.find(c => c.types.indexOf('route') !== -1);
        const zip = r.address_components.find(c => c.types.indexOf('postal_code') !== -1);
        const city = r.address_components.find(c => c.types.indexOf('locality') !== -1);
        const country = r.address_components.find(c => c.types.indexOf('country') !== -1);
        return <Address> {
          lat: r.geometry.location.lat,
          lng: r.geometry.location.lng,
          title: r.formatted_address,
          streetNumber: streetNumber ? streetNumber.long_name : undefined,
          streetName: streetName ? streetName.long_name : undefined,
          zip: zip ? zip.long_name : undefined,
          city: city ? city.long_name : undefined,
          country: country ? country.long_name : undefined
        };
      });
    });
  }
}
