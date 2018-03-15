import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Address } from '../../entities/address';
import { GmapsMapperService } from '../../services/gmaps-mapper.service';

@Component({
  selector: 'app-search-map',
  templateUrl: './search-map.component.html',
  styleUrls: ['./search-map.component.scss']
})
export class SearchMapComponent implements OnInit {

  @Input() public searchPlaceholder = 'Rechercher une adresse';
  @Input() public searchAddress?: Address;
  @Input() public center?: Address;
  @Input() public zoom = 12;

  @Output() public addressFound = new EventEmitter<Address>();
  @Output() public addressMarkerClicked = new EventEmitter<Address>();

  @ViewChild('search')
  public searchElementRef: ElementRef;

  private searchControl: FormControl;

  constructor(private fb: FormBuilder, private gMapsMapperService: GmapsMapperService, private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {}

  ngOnInit() {
    this.searchControl = this.fb.control('');
    this.initAddresses();
    this.loadSearchAutocomplete();
  }

  public clickAddressMarker(): void {
    this.addressMarkerClicked.emit(this.searchAddress);
  }

  private initAddresses(): void {
    if (!this.center && !this.searchAddress) {
      throw new Error('Please provide at least a center for the map');
    }

    if (!this.center && this.searchAddress) {
      this.center = this.searchAddress;
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
          const foundAddress: Address = this.gMapsMapperService.toAddress(place);

          if (foundAddress) {
            this.searchAddress = foundAddress;
            // emit found address
            this.addressFound.emit(foundAddress);
          }
        });
      });
    });
  }

}
