import { Component, Input, OnInit } from '@angular/core';
import { Coworker } from '../../entities/coworker';

@Component({
  selector: 'app-coworker-card',
  templateUrl: './coworker-card.component.html',
  styleUrls: ['./coworker-card.component.scss']
})
export class CoworkerCardComponent implements OnInit {

  @Input()
  public coworker: Coworker;

  constructor() {
  }

  ngOnInit() {
  }

}
