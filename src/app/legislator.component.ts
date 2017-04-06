import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';
import { Bill }                     from './bill';
import { Legislator }               from './legislator';
import { LegislatorService }        from './legislator.service';
import { DataScrollerModule }       from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'my-legislator',
  templateUrl: '../views/legislator.component.html',
  styleUrls: [ '../styles/legislator.component.css' ]
})
export class LegislatorComponent implements OnInit {
  legislator: Legislator;
  selectedLegislator: Legislator;
  sponsored: Bill[];
  cosponsored: Bill[];
  portraitUrl = 'https://theunitedstates.io/images/congress/original/';


  constructor(
    private legislatorService: LegislatorService,
    private router: Router) { }

  getLegislator(): void {
    this.legislatorService
        //.getAllLegislators()
        .getLegislatorById("R000570")
        .subscribe(legislator => this.legislator = legislator);
  }

  getSponsoredLegislation(): void {
      this.legislatorService
        .getLegLatestSponsorAction("R000570")
        .subscribe(sponsored => this.sponsored = sponsored);
  }

  getCosponsoredLegislation(): void {
      this.legislatorService
        .getLegLatestCosponsorAction("R000570")
        .subscribe(cosponsored => this.cosponsored = cosponsored);
  }

  onSelect(legislator: Legislator) {
    this.selectedLegislator = legislator;
  }
  // onSelect(legislator: Legislator) {
  //   this.selectedLegislator = legislator;
  // }

  getLegPortraitUrl(): void {
    this.portraitUrl += 'R000570.jpg';
  }

  ngOnInit(): void {
    this.getLegislator();
    this.getSponsoredLegislation();
    this.getCosponsoredLegislation();
    this.getLegPortraitUrl();
  }

  goToBill(bill_id: string): void {
    this.router.navigate(['/bill', bill_id]);
  }
}
