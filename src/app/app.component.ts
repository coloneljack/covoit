import { Component } from '@angular/core';
import { GmapsService } from 'app/shared/services/gmaps.service';
import { MatSnackBar } from '@angular/material';
import { Address } from './shared/entities/address';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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

  constructor(private gMapsService: GmapsService, private snackBar: MatSnackBar) {
  }

  search(): void {
    this.gMapsService.getPotentialLocations(this.searchAddress).subscribe(
      (locations: Array<Address>) => this.locations = locations,
      error => this.snackBar.open(`An error occurred : ${error}`, 'Got it!', {duration: 5000})
    );
  }

  centerMap(center: any) {
    this.mapCenter = center;
  }
}
