import { Component, OnInit } from '@angular/core';
import { Coworker } from './shared/entities/coworker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public user: Coworker;

  constructor() {}


  public ngOnInit(): void {
    // TODO get connected user
    this.user = {
      firstName: 'Jean-Claude',
      lastName: 'Van Damme',
      email: 'jcvd@aware.com',
      tel: '0654879532'
    };
  }

}
