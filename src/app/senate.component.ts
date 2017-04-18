import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import { Bill }                     from './bill';
import { Legislator }               from './legislator';
import { LegislatorService }        from './legislator.service';
import { DataScrollerModule }       from 'primeng/primeng';
import { Location }                 from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'my-senate',
  templateUrl: '../views/senate.component.html',
  styleUrls: [ '../styles/house-senate.component.css' ]
})
export class SenateComponent implements OnInit {
  legislators: Legislator[];
  selectedLegislator: Legislator;
  portraitUrl = 'https://theunitedstates.io/images/congress/original/';


  constructor(
    private legislatorService: LegislatorService,
    private router: Router,
    private location: Location) { }

  getSenateLegislators(): void {
    this.legislatorService
        .getAllSenateLegislators()
        .subscribe(legislators => this.legislators = legislators);
  }

  onSelect(legislator: Legislator) {
    this.selectedLegislator = legislator;
  }
  // onSelect(legislator: Legislator) {
  //   this.selectedLegislator = legislator;
  // }

  ngOnInit(): void {
    this.getSenateLegislators();
  }

  goToLegislator(bioguide_id: string): void {
    this.router.navigate(['/legislator', bioguide_id]);
  }

  goBack(): void {
    this.location.back();
  }
}
