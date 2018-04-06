import { GoogleMapsAPIWrapper } from '@agm/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Address } from '../entities/address';
import { RouteDetails } from '../entities/route-details';
import { GmapsMapperService } from './gmaps-mapper.service';

declare const google: any;

@Injectable()
export class GmapsService {

  constructor(private gmapsApi: GoogleMapsAPIWrapper, private gmapsMapperService: GmapsMapperService) {}

  public getRouteDetails(origin: Address, destination: Address, waypoints: Array<Address>): Observable<RouteDetails> {
    return Observable.create(observer => {
      const directionsService: google.maps.DirectionsService = new google.maps.DirectionsService();

      directionsService.route({
        origin: this.gmapsMapperService.toLatLng(origin),
        destination: this.gmapsMapperService.toLatLng(destination),
        waypoints: waypoints.map(w => {
          return {
            location: this.gmapsMapperService.toLatLng(w),
            stopover: false
          };
        }),
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const res = result.routes
            .reduce((allLegs, route) => allLegs.concat(route.legs), [])
            .reduce((total, leg) => {
              return {
                origin,
                destination,
                waypoints,
                distance: total.distance + leg.distance.value,
                duration: total.duration + leg.duration.value
              };
            }, {
              distance: 0,
              duration: 0
            });
          observer.next(res);
        }
        observer.complete();
      });
    });
  }

}
