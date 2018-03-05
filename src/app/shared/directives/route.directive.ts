import { GoogleMapsAPIWrapper } from '@agm/core';
import { Directive, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Address } from '../entities/address';

declare const google: any;

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'app-route'
})
export class RouteDirective implements OnInit, OnChanges {

  @Input() public from: Address;
  @Input() public to: Address;
  @Input() public waypoints?: Array<Address>;
  @Input() public keepMapZoomOnDisplay = false;
  private directionsDisplay: any;
  private directionsService: any;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) { }

  public ngOnInit(): void {
    this.gmapsApi.getNativeMap().then(map => {
      this.directionsService = new google.maps.DirectionsService();

      this.directionsDisplay = new google.maps.DirectionsRenderer();
      this.directionsDisplay.setMap(map);

      if (this.keepMapZoomOnDisplay) {
        this.directionsDisplay.setOptions({preserveViewport: true});
      }
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.from && this.to) {
      this.displayRoute();
    }
  }

  private displayRoute(): void {
    this.gmapsApi.getNativeMap().then(() => {
      this.directionsService.route({
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
          this.directionsDisplay.setDirections(response);
        } else {
          console.log('Directions request failed due to ' + status);
        }
      });
    });
  }
}
