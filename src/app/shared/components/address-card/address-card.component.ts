import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Address } from '../../entities/address';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss']
})
export class AddressCardComponent implements OnInit {

  @Input()
  public address: Address;

  @Input()
  public canSetAsOrigin = true;

  @Input()
  public canUnsetAsOrigin = false;

  @Input()
  public canSetAsDestination = true;

  @Input()
  public canUnsetAsDestination = false;

  @Input()
  public canAddAsWaypoint = true;

  @Input()
  public canRemoveAsWaypoint = false;

  @Input()
  public highlighted = false;

  @Output()
  public setAsOrigin = new EventEmitter<void>();

  @Output()
  public setAsDestination = new EventEmitter<void>();

  @Output()
  public addedAsWaypoint = new EventEmitter<void>();

  @Output()
  public unsetAsOrigin = new EventEmitter<void>();

  @Output()
  public unsetAsDestination = new EventEmitter<void>();

  @Output()
  public removedAsWaypoint = new EventEmitter<void>();

  constructor() {
  }

  get title(): string {
    return this.address.coworker ? `${this.address.coworker.firstName} ${this.address.coworker.lastName}` : this.address.title;
  }

  get subtitle(): string {
    return this.address.coworker ? this.address.coworker.job : null;
  }

  public ngOnInit(): void {
  }

  public setOrigin(): void {
    this.setAsOrigin.emit();
  }

  public setDestination(): void {
    this.setAsDestination.emit();
  }

  public addAsWaypoint(): void {
    this.addedAsWaypoint.emit();
  }

  public unsetOrigin(): void {
    this.unsetAsOrigin.emit();
  }

  public unsetDestination(): void {
    this.unsetAsDestination.emit();
  }

  public removeAsWaypoint(): void {
    this.removedAsWaypoint.emit();
  }

}
