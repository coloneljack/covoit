import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Coworker } from '../shared/entities/coworker';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  public showMenuButton = true;

  @Input()
  public user: Coworker;

  @Output()
  public menuButtonClicked = new EventEmitter<void>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public clickMenuButton(): void {
    this.menuButtonClicked.emit();
  }

  public async logout() {
    // TODO delete user info
    await this.router.navigate(['login']);
  }
}