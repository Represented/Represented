import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { RepAction }                from './repaction';
import { RepActionService }         from './repaction.service';
import { DataScrollerModule }       from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'my-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: [ '../scss/newsfeed.component.css' ]
})
export class NewsfeedComponent implements OnInit {
  repactions: RepAction[];

  constructor(
    private repActionService: RepActionService,
    private router: Router) { }

  getActions(): void {
    this.repActionService
        .getActions()
        .then(repactions => this.repactions = repactions);
  }
  ngOnInit(): void {
    this.getActions();
  }
}
