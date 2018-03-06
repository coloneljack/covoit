import { GoogleMapsAPIWrapper } from '@agm/core';
import { Directive, DoCheck, Input, IterableDiffer, IterableDiffers, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Address } from '../entities/address';

declare const google: any;

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'app-route'
})
export class RouteDirective implements OnInit, OnChanges, DoCheck {

  @Input() public from: Address;
  @Input() public to: Address;
  @Input() public waypoints?: Array<Address>;
  @Input() public keepMapZoomOnDisplay = false;
  private directionsDisplay: any;
  private directionsService: any;
  private iterableDiffer: IterableDiffer<any>;

  constructor(private gmapsApi: GoogleMapsAPIWrapper, private _iterableDiffers: IterableDiffers) {
    this.iterableDiffer = this._iterableDiffers.find([]).create(null);
  }

  public ngOnInit(): void {
    this.gmapsApi.getNativeMap().then(map => {
      this.directionsService = new google.maps.DirectionsService();

      this.directionsDisplay = new google.maps.DirectionsRenderer();

      if (this.keepMapZoomOnDisplay) {
        this.directionsDisplay.setOptions({preserveViewport: true});
      }
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.displayRoute();
  }

  public ngDoCheck(): void {
    const changes = this.iterableDiffer.diff(this.waypoints);
    if (changes) {
      this.displayRoute();
    }
  }

  private displayRoute(): void {
    if (this.from && this.to) {
      this.gmapsApi.getNativeMap().then(map => {
        this.directionsService.route({
          origin: {
            lat: this.from.lat,
            lng: this.from.lng
          },
          destination: {
            lat: this.to.lat,
            lng: this.to.lng
          },
          waypoints: this.waypoints.map(w => {
            return {
              location: {
                lat: w.lat,
                lng: w.lng
              }
            };
          }),
          optimizeWaypoints: true,
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC
        }, (response, status) => {
          if (status === 'OK') {
            this.directionsDisplay.setMap(map);
            this.directionsDisplay.setDirections(response);
          } else {
            console.log('Directions request failed due to ' + status);
          }
        });
      });
    } else if (this.directionsDisplay) {
      // Remove direction if origin or destination is missing
      this.directionsDisplay.setMap(null);
    }
  }
}
