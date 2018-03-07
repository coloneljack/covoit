import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { GmapsService } from 'app/shared/services/gmaps.service';
import { AppService } from './app.service';
import { Address } from './shared/entities/address';
import { Coworker } from './shared/entities/coworker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'Covoit\' OAB';
  public locations: Array<Address> = [];
  public searchAddress = '';
  public routeDestination: Address;
  public mapCenter: Address;
  public routeOrigin: Address;
  public coworkers: Array<Coworker> = [];
  public selected: Coworker | Address;
  public otherAddresses: Array<Address> = [];
  public waypoints: Array<Address> = [];
  public alreadyOrigin = false;
  public alreadyDestination = false;
  public alreadyWaypoint = false;

  constructor(private gMapsService: GmapsService, private appService: AppService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.appService.getWorkLocation().subscribe((wl: Address) => {
      this.mapCenter = wl;
      this.routeDestination = wl;
      this.otherAddresses.push(wl);
    });
    this.appService.getAllCoworkers().subscribe((coworkers: Array<Coworker>) => this.coworkers = coworkers);
  }

  search(): void {
    this.gMapsService.getPotentialLocations(this.searchAddress).subscribe(
      (locations: Array<Address>) => this.locations = locations,
      error => this.snackBar.open(`An error occurred : ${error}`, 'Got it!', {duration: 5000})
    );
  }

  centerMap(center: Address): void {
    this.mapCenter = center;
  }

  addMarker(address: Address): void {
    this.otherAddresses.push(address);
  }

  select(selected: Coworker | Address): void {
    this.selected = selected;
    let address: Address;

    if (selected instanceof Coworker) {
      address = selected.address;
    } else {
      address = selected;
    }

    this.selectAddress(address);
  }

  displayRouteFrom(address: Address): void {
    this.routeOrigin = address;
    this.removeWaypoint(address);
    this.alreadyOrigin = true;
  }

  displayRouteTo(address: Address): void {
    this.routeDestination = address;
    this.removeWaypoint(address);
    this.alreadyDestination = true;
  }

  addWaypoint(address: Address): void {
    this.waypoints.push(address);
    this.alreadyWaypoint = true;
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

  private selectAddress(address: Address): void {
    this.alreadyOrigin = (this.routeOrigin === address);
    this.alreadyDestination = (this.routeDestination === address);
    this.alreadyWaypoint = (this.waypoints.indexOf(address) !== -1);
  }

}
