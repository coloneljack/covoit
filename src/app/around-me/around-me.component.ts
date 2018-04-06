import { ControlPosition } from '@agm/core/services/google-maps-types';
import { Component, OnInit } from '@angular/core';
import { Address } from '../shared/entities/address';
import { RouteDetails } from '../shared/entities/route-details';
import { User } from '../shared/entities/user';
import { GmapsMapperService } from '../shared/services/gmaps-mapper.service';
import { UserInfoService } from '../user-info/user-info.service';
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
  user: User;
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
  routeDefined = false;
  closestRouteDetails: RouteDetails;

  constructor(private gMapsMapperService: GmapsMapperService, private aroundMeService: AroundMeService,
              private userInfoService: UserInfoService) {}

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
    this.userInfoService.getCurrentUserInfo().subscribe(user => this.user = user);
    this.aroundMeService.getAllUsers().subscribe((coworkerAddresses: Array<User>) => this.users = coworkerAddresses);
  }

  isUser(a: any): a is User {
    const user = <User> a;
    return user && user.firstName !== undefined && user.lastName !== undefined;
  }

  isAddress(a: any): a is Address {
    const address = <Address> a;
    return address && address.lat !== undefined && address.lng !== undefined;
  }

  findClosestAddress(): void {
    if (this.selected && this.selected !== this.workLocation) {
      const selectedAddress = this.isUser(this.selected) ? this.selected.address : this.selected;
      const waypoints = this.users.filter(u => u !== this.selected).map(u => u.address).concat(this.otherAddresses);
      this.aroundMeService.getRouteDetailsOfClosestWaypoint(selectedAddress, this.workLocation, waypoints)
        .subscribe(routeDetails => this.closestRouteDetails = routeDetails);
    }
  }

  resetClosestAddress(): void {
    this.closestRouteDetails = null;
  }

  centerMap(center: Address): void {
    this.mapCenter = center;
  }

  select(poi: User | Address): void {
    if (poi) {
      this.selected = poi;
      this.alreadyOrigin = (this.origin === poi);
      this.alreadyDestination = (this.destination === poi);
      this.alreadyWaypoint = (this.waypoints.indexOf(poi) !== -1);
      this.findClosestAddress();
    }
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
    this.routeOrigin = null;
    this.alreadyOrigin = false;
  }

  resetDestination(): void {
    this.destination = null;
    this.routeDestination = null;
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

  routeDisplayed(isDisplayed: boolean): void {
    this.routeDefined = isDisplayed;
  }

  getRouteLineTitle(element: User | Address): string {
    let title = '';
    if (this.isUser(element)) {
      title = `${element.firstName} ${element.lastName}`;
    } else if (this.isAddress(element)) {
      title = element.title || `${element.streetNumber} ${element.streetName}, ${element.zip} ${element.city}, ${element.country}`;
    }

    return title;
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
