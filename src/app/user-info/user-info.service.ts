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
        title: 'Mon adresse',
        streetNumber: '22',
        streetName: 'rue d\'Altaïr',
        zip: '44700',
        city: 'Orvault',
        country: 'France'
      },
      workingWeek: {
        monday: {idle: false, amStart: '09:00', amEnd: '12:15', pmStart: '13:45', pmEnd: '18:00'},
        tuesday: {idle: false, amStart: '09:00', amEnd: '12:00', pmStart: '13:30', pmEnd: '18:30'},
        wednesday: {idle: true},
        thursday: {idle: false, amStart: '09:00', amEnd: '12:30', pmStart: '14:00', pmEnd: '17:45'},
        friday: {idle: false, amStart: '10:00', amEnd: '12:15', pmStart: '13:45', pmEnd: '17:30'}
      }
    });
  }

  public getIncompleteCurrentUserInfo(): Observable<User> {
    return Observable.of({
      firstName: 'Vincent',
      lastName: 'Nourry'
    });
  }

  public saveUserInfo(user: User): Observable<string> {
    console.log('--> UserInfoService::saveUserAddress');
    console.log(user);
    console.log('<-- UserInfoService::saveUserAddress');
    return Observable.of('OK');
  }
}
