import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Coworker } from '../../entities/coworker';

@Component({
  selector: 'app-coworker-card',
  templateUrl: './coworker-card.component.html',
  styleUrls: ['./coworker-card.component.scss']
})
export class CoworkerCardComponent implements OnInit {

  @Input()
  public coworker: Coworker;

  @Input()
  public canSetAsOrigin = true;

  @Input()
  public canSetAsDestination = true;

  @Input()
  public canAddAsWaypoint = true;

  @Output()
  public setAsOrigin = new EventEmitter();

  @Output()
  public setAsDestination = new EventEmitter();

  @Output()
  public addedAsWaypoint = new EventEmitter();

  constructor() {
  }

  public ngOnInit() {
  }

  public setOrigin(): void {
    this.setAsOrigin.emit(this.coworker.address);
  }

  public setDestination(): void {
    this.setAsDestination.emit(this.coworker.address);
  }

  public addAsWaypoint(): void {
    this.addedAsWaypoint.emit(this.coworker.address);
  }

}
