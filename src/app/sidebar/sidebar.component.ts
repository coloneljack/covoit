import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavLink } from './nav-link';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public links: Array<NavLink> = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.links = [
      new NavLink('user-info', 'Informations utilisateur', 'face', this.router.url.endsWith('user-info')),
      new NavLink('around-me', 'Autour de moi', 'map', this.router.url.endsWith('around-me'))
    ];
  }

  select(link: NavLink) {
    link.selected = true;
    this.links.filter(l => l !== link).forEach(l => l.selected = false);
    this.router.navigate([link.routerLink]);
  }

}
