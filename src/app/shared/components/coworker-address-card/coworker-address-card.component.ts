import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Address } from '../../entities/address';
import { Coworker } from '../../entities/coworker';

@Component({
  selector: 'app-coworker-address-card',
  templateUrl: './coworker-address-card.component.html',
  styleUrls: ['./coworker-address-card.component.scss']
})
export class CoworkerAddressCardComponent implements OnChanges {
  @Input()
  public detail: Coworker | Address;

  @Input()
  public title?: string;

  @Input()
  public subtitle?: string;

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

  @Output()
  public setAsOrigin = new EventEmitter();

  @Output()
  public setAsDestination = new EventEmitter();

  @Output()
  public addedAsWaypoint = new EventEmitter();

  @Output()
  public unsetAsOrigin = new EventEmitter();

  @Output()
  public unsetAsDestination = new EventEmitter();

  @Output()
  public removedAsWaypoint = new EventEmitter();

  public address: Address;

  constructor() {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.detail instanceof Coworker) {
      this.address = this.detail.address;
      this.title = this.detail.name;
      this.subtitle = this.detail.job;
    } else {
      this.address = this.detail;
      this.title = this.address.title;
      this.subtitle = null;
    }
  }

  public setOrigin(): void {
    this.setAsOrigin.emit(this.address);
  }

  public setDestination(): void {
    this.setAsDestination.emit(this.address);
  }

  public addAsWaypoint(): void {
    this.addedAsWaypoint.emit(this.address);
  }

  public unsetOrigin(): void {
    this.unsetAsOrigin.emit(this.address);
  }

  public unsetDestination(): void {
    this.unsetAsDestination.emit(this.address);
  }

  public removeAsWaypoint(): void {
    this.removedAsWaypoint.emit(this.address);
  }

}
