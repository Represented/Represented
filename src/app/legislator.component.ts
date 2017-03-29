import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';

import { Legislator }               from '../data/legislator';
import { LegislatorService }        from './legislator.service';
import { DataScrollerModule }       from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'my-legislator',
  templateUrl: '../views/legislator.component.html',
  styleUrls: [ '../styles/legislator.component.css' ]
})
export class LegislatorComponent implements OnInit {
  legislator: Legislator[];

  constructor(
    private legislatorService: LegislatorService,
    private router: Router) { }

  getLegislator(): void {
    this.legislatorService
        .getLegislatorTest("R000570");
        //.getLegislatorById("R000570")
        //.then(legislator => this.legislator = legislator);
  }
  ngOnInit(): void {
    this.getLegislator();
  }
}
