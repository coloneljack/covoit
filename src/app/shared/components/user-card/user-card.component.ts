import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../entities/user';
import { AddressActionsComponent } from '../address-actions/address-actions.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent extends AddressActionsComponent implements OnInit {

  @Input() user: User;
  @Input() highlighted = false;

  constructor() {
    super();
  }
}
