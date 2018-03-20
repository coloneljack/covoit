import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-address-actions',
  templateUrl: './address-actions.component.html',
  styleUrls: ['./address-actions.component.scss']
})
export class AddressActionsComponent implements OnInit {

  @Input() canSetAsOrigin = true;
  @Input() canUnsetAsOrigin = false;
  @Input() canSetAsDestination = true;
  @Input() canUnsetAsDestination = false;
  @Input() canAddAsWaypoint = true;
  @Input() canRemoveAsWaypoint = false;

  @Output() setAsOrigin = new EventEmitter<void>();
  @Output() setAsDestination = new EventEmitter<void>();
  @Output() addedAsWaypoint = new EventEmitter<void>();
  @Output() unsetAsOrigin = new EventEmitter<void>();
  @Output() unsetAsDestination = new EventEmitter<void>();
  @Output() removedAsWaypoint = new EventEmitter<void>();
  @Output() centered = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  setOrigin(): void {
    this.setAsOrigin.emit();
  }

  setDestination(): void {
    this.setAsDestination.emit();
  }

  addAsWaypoint(): void {
    this.addedAsWaypoint.emit();
  }

  unsetOrigin(): void {
    this.unsetAsOrigin.emit();
  }

  unsetDestination(): void {
    this.unsetAsDestination.emit();
  }

  removeAsWaypoint(): void {
    this.removedAsWaypoint.emit();
  }

  center(): void {
    this.centered.emit();
  }

  hasAction(event: EventEmitter<void>): boolean {
    return event.observers.length > 0;
  }

  hasActions(): boolean {
    return this.hasAction(this.setAsOrigin) || this.hasAction(this.setAsDestination) || this.hasAction(this.addedAsWaypoint) ||
      this.hasAction(this.unsetAsOrigin) || this.hasAction(this.unsetAsDestination) || this.hasAction(this.removedAsWaypoint) ||
      this.hasAction(this.centered);
  }
}
