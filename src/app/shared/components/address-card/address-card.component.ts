import { Component, Input, OnInit } from '@angular/core';
import { Address } from '../../entities/address';
import { AddressActionsComponent } from '../address-actions/address-actions.component';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss']
})
export class AddressCardComponent extends AddressActionsComponent implements OnInit {

  @Input() address: Address;
  @Input() highlighted = false;

  constructor() {
    super();
  }
}
