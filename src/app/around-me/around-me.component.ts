import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Address } from '../shared/entities/address';
import { GmapsMapperService } from '../shared/services/gmaps-mapper.service';
import { AroundMeService } from './around-me.service';

@Component({
  selector: 'app-around-me',
  templateUrl: './around-me.component.html',
  styleUrls: ['./around-me.component.scss']
})
export class AroundMeComponent implements OnInit {

  @ViewChild('search')
  public searchElementRef: ElementRef;

  public title = 'Covoit\' OAB';
  public searchAddress: Address;
  public workLocation: Address;
  public routeDestination: Address;
  public mapCenter: Address;
  public routeOrigin: Address;
  public coworkerAddresses: Array<Address> = [];
  public selected: Address;
  public otherAddresses: Array<Address> = [];
  public waypoints: Array<Address> = [];
  public alreadyOrigin = false;
  public alreadyDestination = false;
  public alreadyWaypoint = false;
  public searchControl: FormControl;
  public zoom = 12;

  constructor(private gMapsMapperService: GmapsMapperService, private aroundMeService: AroundMeService, private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone, private snackBar: MatSnackBar, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchControl = this.fb.control('');
    this.loadSearchAutocomplete();
    this.aroundMeService.getWorkLocation().subscribe((wl: Address) => {
      this.mapCenter = wl;
      this.routeDestination = wl;
      this.workLocation = wl;
    });
    this.aroundMeService.getAllCoworkerAddresses().subscribe((coworkerAddresses: Array<Address>) => this.coworkerAddresses = coworkerAddresses);
  }

  centerMap(center: Address): void {
    this.mapCenter = center;
  }

  select(address: Address): void {
    this.selected = address;
    this.selectAddress(address);
  }

  displayRouteFrom(address: Address): void {
    this.routeOrigin = address;
    this.removeWaypoint(address);
    this.alreadyOrigin = true;
    this.addMarker(address);
  }

  displayRouteTo(address: Address): void {
    this.routeDestination = address;
    this.removeWaypoint(address);
    this.alreadyDestination = true;
    this.addMarker(address);
  }

  addWaypoint(address: Address): void {
    this.waypoints.push(address);
    this.alreadyWaypoint = true;
    this.addMarker(address);
  }

  resetOrigin(): void {
    this.routeOrigin = null;
    this.alreadyOrigin = false;
  }

  resetDestination(): void {
    this.routeDestination = null;
    this.alreadyDestination = false;
  }

  removeWaypoint(address: Address) {
    const idx = this.waypoints.indexOf(address);
    if (idx !== -1) {
      this.waypoints.splice(idx, 1);
    }
    this.alreadyWaypoint = false;
  }

  private addMarker(address: Address): void {
    if (this.coworkerAddresses.indexOf(address) === -1 && this.otherAddresses.indexOf(address) === -1 && this.workLocation !== address) {
      this.otherAddresses.push(address);
    }
  }

  private loadSearchAutocomplete(): void {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        componentRestrictions: {
          country: 'fr'
        }
      });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          const addressFound = this.gMapsMapperService.toAddress(place);

          if (addressFound) {
            // set address and map center
            this.searchAddress = addressFound;
            this.mapCenter = addressFound;
            this.selected = addressFound;
          }
        });
      });
    });
  }

  private selectAddress(address: Address): void {
    this.alreadyOrigin = (this.routeOrigin === address);
    this.alreadyDestination = (this.routeDestination === address);
    this.alreadyWaypoint = (this.waypoints.indexOf(address) !== -1);
  }

}
