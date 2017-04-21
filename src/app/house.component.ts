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
  selector: 'my-house',
  templateUrl: '../views/house.component.html',
  styleUrls: [ '../styles/house-senate.component.css' ]
})
export class HouseComponent implements OnInit {
  legislators: Legislator[];
  selectedLegislator: Legislator;
  portraitUrl = 'https://theunitedstates.io/images/congress/original/';
  page: number;

  constructor(
    private legislatorService: LegislatorService,
    private router: Router,
    private location: Location) { }

  getHouseLegislators(): void {
    this.legislatorService
        .getAllHouseLegislators(this.page.toString())
        .subscribe(legislators => this.legislators = legislators);
  }

  getMoreLegislators(): void {
    this.legislatorService
        .getAllHouseLegislators(this.page.toString())
        .subscribe(legislators => {
          for(let i = 0; i < legislators.length; i++){
            this.legislators.push(legislators[i]);
          }
        });
  }

  onSelect(legislator: Legislator) {
    this.selectedLegislator = legislator;
  }
  // onSelect(legislator: Legislator) {
  //   this.selectedLegislator = legislator;
  // }

  ngOnInit(): void {
    this.page = 1;
    //this.getSenateLegislators();
  }

  loadData(event: any) {
    if(!this.legislators) {
      this.getHouseLegislators();
      this.page++;
    } else {
      this.getMoreLegislators();
      this.page++;
    }
  }

  goToLegislator(bioguide_id: string): void {
    this.router.navigate(['/legislator', bioguide_id]);
  }

  goBack(): void {
    this.location.back();
  }
}
