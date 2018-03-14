import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavLink } from './nav-link';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() public linkClicked = new EventEmitter<void>();

  public links: Array<NavLink> = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.links = [
      new NavLink('home', 'Accueil', 'home', this.router.url.endsWith('home')),
      new NavLink('user-info', 'Informations utilisateur', 'face', this.router.url.endsWith('user-info')),
      new NavLink('around-me', 'Autour de moi', 'map', this.router.url.endsWith('around-me'))
    ];
  }

  async select(link: NavLink) {
    link.selected = true;
    this.links.filter(l => l !== link).forEach(l => l.selected = false);
    await this.router.navigate([link.routerLink]);
    this.linkClicked.emit();
  }

}
