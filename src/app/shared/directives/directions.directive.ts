import { GoogleMapsAPIWrapper } from '@agm/core';
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Address } from '../entities/address';

declare const google: any;

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'app-route'
})
export class RouteDirective implements OnChanges {
  @Input() from: Address;
  @Input() to: Address;
  @Input() waypoints?: Array<Address>;
  @Input() keepMapZoomOnDisplay = false;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.from && this.to) {
      this.setMap();
    }
  }

  private setMap(): void {
    this.gmapsApi.getNativeMap().then(map => {
      const directionsService = new google.maps.DirectionsService();
      const directionsDisplay = new google.maps.DirectionsRenderer();

      directionsDisplay.setMap(map);

      directionsService.route({
        origin: {
          lat: this.from.lat,
          lng: this.from.lng
        },
        destination: {
          lat: this.to.lat,
          lng: this.to.lng
        },
        waypoints: this.waypoints,
        optimizeWaypoints: true,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC
      }, (response, status) => {
        if (status === 'OK') {
          if (this.keepMapZoomOnDisplay) {
            directionsDisplay.setOptions({preserveViewport: true});
          }
          directionsDisplay.setDirections(response);
        } else {
          console.log('Directions request failed due to ' + status);
        }
      });
    });
  }
}
