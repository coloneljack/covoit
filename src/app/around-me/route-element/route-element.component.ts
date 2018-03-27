import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-route-element',
  templateUrl: './route-element.component.html',
  styleUrls: ['./route-element.component.scss']
})
export class RouteElementComponent implements OnInit {

  @Input() title: string;
  @Input() iconName?: string;
  @Input() iconColor?: string;
  @Input() highlighted = false;
  @Output() removed: EventEmitter<void> = new EventEmitter<void>();
  hasRemoveAction: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.hasRemoveAction = this.removed.observers.length > 0;
  }

  remove(): void {
    this.removed.emit();
  }
}
