import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../shared/entities/user';

@Injectable()
export class UserInfoService {

  constructor(private http: HttpClient) { }

  public getCurrentUserInfo(): Observable<User> {
    return Observable.of({
      firstName: 'Vincent',
      lastName: 'Nourry',
      job: 'Ingénieur concepteur confirmé',
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
    });
  }

  public saveUserInfo(address: User): Observable<string> {
    console.log('--> UserInfoService::saveUserAddress');
    console.log(address);
    console.log('<-- UserInfoService::saveUserAddress');
    return Observable.of('OK');
  }
}
