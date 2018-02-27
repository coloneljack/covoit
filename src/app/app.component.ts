import { Component } from '@angular/core';
import { GmapsService } from 'app/shared/services/gmaps.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Google Maps test';
  public locations: Array<string> = [];
  public searchAddress = '';

  constructor(private gMapsService: GmapsService, private snackBar: MatSnackBar) {
  }

  search(): void {
    this.gMapsService.getPotentialLocations(this.searchAddress).subscribe(
      (locations: Array<any>) => this.locations = locations,
      error => this.snackBar.open(`An error occurred : ${error}`, 'Got it!', {duration: 5000})
    );
  }
}
