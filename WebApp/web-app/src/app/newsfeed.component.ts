import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { RepAction }                from './repaction';
import { RepActionService }         from './repaction.service';

@Component({
  moduleId: module.id,
  selector: 'my-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: [ './newsfeed.component.css' ]
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
