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
  public title = 'Google Maps test';
  public locations: Array<Address> = [];
  public searchAddress = '';
  public workLocation: Address = {
    lat: 47.2753091,
    lng: -1.51228
  };
  public mapCenter: Address = {
    lat: this.workLocation.lat,
    lng: this.workLocation.lng
  };
  public coworkers: Array<Coworker> = [];
  public otherAddresses: Array<Address> = [];
  public route: any = {};

  constructor(private gMapsService: GmapsService, private appService: AppService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
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

  findRoute(address: Address): void {
    this.gMapsService.getRoute(address, this.workLocation).subscribe(result => this.route = result);
  }
}
