import { Component, OnInit } from '@angular/core';
import { User } from './shared/entities/user';
import { UserInfoService } from './user-info/user-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public user: User;

  constructor(private userService: UserInfoService) {}


  public ngOnInit(): void {
    this.userService.getIncompleteCurrentUserInfo().subscribe(u => this.user = u);
  }

}
