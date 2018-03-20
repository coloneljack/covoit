import { MapsAPILoader } from '@agm/core';
import { ControlPosition } from '@agm/core/services/google-maps-types';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Address } from '../shared/entities/address';
import { User } from '../shared/entities/user';
import { GmapsMapperService } from '../shared/services/gmaps-mapper.service';
import { AroundMeService } from './around-me.service';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-around-me',
  templateUrl: './around-me.component.html',
  styleUrls: ['./around-me.component.scss']
})
export class AroundMeComponent implements OnInit {

  searchBoxPosition: ControlPosition = ControlPosition.TOP_CENTER;
  workLocation: Address;
  destination: User | Address;
  mapCenter: Address;
  origin: User | Address;
  users: Array<User> = [];
  selected: User | Address;
  foundAddresses: Array<Address> = [];
  otherAddresses: Array<Address> = [];
  waypoints: Array<User | Address> = [];
  alreadyOrigin = false;
  alreadyDestination = false;
  alreadyWaypoint = false;
  zoom = 12;
  routeOrigin: Address;
  routeDestination: Address;
  routeWaypoints: Array<Address> = [];

  constructor(private gMapsMapperService: GmapsMapperService, private aroundMeService: AroundMeService) {}

  setRouteOrigin(): void {
    this.routeOrigin = this.getAddress(this.origin);
  }

  setRouteDestination(): void {
    this.routeDestination = this.getAddress(this.destination);
  }

  setRouteWaypoints(): void {
    this.routeWaypoints = this.waypoints.map(this.getAddress.bind(this));
  }

  ngOnInit(): void {
    this.aroundMeService.getWorkLocation().subscribe((wl: Address) => {
      this.mapCenter = wl;
      this.destination = wl;
      this.setRouteDestination();
      this.workLocation = wl;
    });
    this.aroundMeService.getAllUsers().subscribe((coworkerAddresses: Array<User>) => this.users = coworkerAddresses);
  }

  isUser(a: any): a is User {
    const user = <User> a;
    return user.firstName !== undefined && user.lastName !== undefined;
  }

  isAddress(a: any): a is Address {
    const address = <Address> a;
    return address.lat !== undefined && address.lng !== undefined;
  }

  centerMap(center: Address): void {
    this.mapCenter = center;
  }

  select(poi: User | Address): void {
    this.selected = poi;
    this.alreadyOrigin = (this.origin === poi);
    this.alreadyDestination = (this.destination === poi);
    this.alreadyWaypoint = (this.waypoints.indexOf(poi) !== -1);
  }

  displayRouteFrom(poi: User | Address): void {
    this.origin = poi;
    this.setRouteOrigin();
    this.removeWaypoint(poi);
    this.alreadyOrigin = true;
    this.addMarker(poi);
  }

  displayRouteTo(poi: User | Address): void {
    this.destination = poi;
    this.setRouteDestination();
    this.removeWaypoint(poi);
    this.alreadyDestination = true;
    this.addMarker(poi);
  }

  addWaypoint(poi: User | Address): void {
    this.waypoints.push(poi);
    this.setRouteWaypoints();
    this.alreadyWaypoint = true;
    this.addMarker(poi);
  }

  resetOrigin(): void {
    this.origin = null;
    this.alreadyOrigin = false;
  }

  resetDestination(): void {
    this.destination = null;
    this.alreadyDestination = false;
  }

  removeWaypoint(poi: User | Address) {
    const idx = this.waypoints.indexOf(poi);
    if (idx !== -1) {
      this.waypoints.splice(idx, 1);
    }
    this.setRouteWaypoints();
    this.alreadyWaypoint = false;
  }

  showSearchResults(foundPlaces: Array<PlaceResult>): void {
    this.foundAddresses = foundPlaces ? foundPlaces.map(this.gMapsMapperService.toAddress) : [];
  }

  private getAddress(poi: User | Address): Address {
    if (!poi) {
      return null;
    }
    return this.isUser(poi) ? poi.address : poi;
  }

  private addMarker(poi: User | Address): void {
    // Users already have their existing marker on the map
    if (this.isAddress(poi) && this.otherAddresses.indexOf(poi) === -1 && this.workLocation !== poi) {
      this.otherAddresses.push(poi);
    }
  }

}
