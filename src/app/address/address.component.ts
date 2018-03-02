import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Address } from '../shared/entities/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Input()
  public address: Address;

  @Output()
  public addressSelected = new EventEmitter();

  @Output()
  public addressAdded = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  public select(): void {
    this.addressSelected.emit(this.address);
  }

  public add(): void {
    this.addressAdded.emit(this.address);
  }
}
