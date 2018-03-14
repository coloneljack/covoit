import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Address } from '../shared/entities/address';

@Injectable()
export class UserInfoService {

  constructor(private http: HttpClient) { }

  public getCurrentUserInfo(): Observable<Address> {
    return Observable.of({
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
    });
  }

  public saveUserInfo(address: Address): Observable<string> {
    console.log('--> UserInfoService::saveUserAddress');
    console.log(address);
    console.log('<-- UserInfoService::saveUserAddress');
    return Observable.of('OK');
  }
}
