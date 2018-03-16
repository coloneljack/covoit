import { GoogleMapsAPIWrapper } from '@agm/core';
import { ControlPosition } from '@agm/core/services/google-maps-types';
import { Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

declare const google: any;

/**
 * AgmSearchBox allows to add a search box to the map
 *
 * ### Example
 *
 * ```
 * <app-search-box [placeholder]="'Search'" [position]="ControlPosition.TOP_LEFT"
 *   (placesChange)="updateRef($event)"></app-search-box>
 * ```
 *
 */
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit, OnChanges {
  /**
   * @internal
   */
  @ViewChild('panel') panel: ElementRef;
  /**
   * Placeholder for the search box input
   */
  @Input() placeholder: string;
  /**
   * Position in which the control is going to placed
   * This input is required otherwise the box won't be added to the map
   */
  @Input() position: ControlPosition;
  /**
   * Will automatically center the map to the clicked result
   */
  @Input() autoBoundResults = true;
  /**
   * The area towards which to bias query predictions. Predictions are biased towards, but not restricted to,
   * queries targeting these bounds.
   */
  @Input() bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
  /**
   * This event is fired when the user selects a query, will return the places matching that query.
   */
  @Output() placesChange: EventEmitter<Array<google.maps.places.PlaceResult>> = new EventEmitter();
  private searchBox: google.maps.places.SearchBox;

  constructor(private gmapsApi: GoogleMapsAPIWrapper, private _zone: NgZone) {}

  /** @internal */
  ngOnInit(): void {
    this.gmapsApi.getNativeMap().then(map => {
      this.createEventObservable().subscribe(() => {
        this.placesChange.emit(this.getSearchBoxEl().getPlaces());
        if (this.autoBoundResults) {
          this.autoBound();
        }
      });
    });
  }

  /** @internal */
  createEventObservable<T>(): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      this.getSearchBoxEl().addListener('places_changed', (e: T) => {
        this._zone.run(() => observer.next(e));
      });
    });
  }

  /** @internal */
  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    this.gmapsApi.getNativeMap().then(map => {
      if (changes['bounds']) {
        this.getSearchBoxEl().setBounds(this.bounds);
      }
      if (changes['position']) {
        this.updatePosition(this.position);
      }
    });
  }

  /** @internal */
  getSearchBoxEl(): google.maps.places.SearchBox {
    if (this.searchBox === undefined) {
      this.searchBox = new google.maps.places.SearchBox(this.panel.nativeElement, {
        bounds: this.bounds
      });
    }
    return this.searchBox;
  }

  /** @internal */
  updatePosition(position: ControlPosition) {
    if (position) {
      // FIXME
      this.gmapsApi.getNativeMap().then((map: any) => {
        map.controls[position].push(this.panel.nativeElement);
      });
    }
  }

  /** @internal */
  autoBound() {
    const places = this.getSearchBoxEl().getPlaces();

    if (places.length === 0) {
      return;
    }

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place: google.maps.places.PlaceResult) => {
      if (!place.geometry) {
        console.log('Place does not contain a geometry');
        return;
      }

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    this.gmapsApi.fitBounds(bounds);
  }

}
