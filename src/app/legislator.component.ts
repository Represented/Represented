import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import { Bill }                     from './bill';
import { Legislator }               from './legislator';
import { LegislatorService }        from './legislator.service';
import { DataScrollerModule }       from 'primeng/primeng';
import { Location }                 from '@angular/common';
import { Vote }                     from './vote';

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
  allBills: Bill[];
  votes: Vote[];
  key = String;
  portraitUrl = 'https://theunitedstates.io/images/congress/original/';


  constructor(
    private legislatorService: LegislatorService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) { }

  getLegislator(): void {
    this.route.params
      .switchMap((params: Params) =>
        this.legislatorService
        .getLegislatorById(params['bioguide_id']))
        .subscribe(legislator => {
			this.legislator = legislator;
			/*
			//capitalize chamber
			if(legislator[0].chamber == 'senate') this.legislator.chamber = 'Senate';
			if(legislator[0].chamber == 'house') this.legislator.chamber = 'House';
			//more readable dates
			let termStart: string = legislator[0].term_start;
			let termEnd: string = legislator[0].term_end;
			let timeSplitStart: string[] = termStart.split('-');
			let timeSplitEnd: string[] = termEnd.split('-');
			timeSplitStart[1] = timeSplitStart[1] + '-';
			timeSplitStart[2] = timeSplitStart[2] + '-';
			timeSplitEnd[1] = timeSplitEnd[1] + '-';
			timeSplitEnd[2] = timeSplitEnd[2] + '-';
			this.legislator.term_start = timeSplitStart[1].concat(timeSplitStart[2].concat(timeSplitStart[0]));
			this.legislator.term_end = timeSplitEnd[1].concat(timeSplitEnd[2].concat(timeSplitEnd[0]));
			*/
		});
  }

  getSponsoredLegislation(): void {
    this.route.params
      .switchMap((params: Params) =>
        this.legislatorService
        .getLegLatestSponsorAction(params['bioguide_id']))
        .subscribe(sponsored => this.sponsored = sponsored);
  }

  getCosponsoredLegislation(): void {
    this.route.params
      .switchMap((params: Params) =>
        this.legislatorService
        .getLegLatestCosponsorAction(params['bioguide_id']))
        .subscribe(cosponsored => this.cosponsored = cosponsored);
  }

  getVotedOnLegislation(): void {
    this.route.params
      .switchMap((params: Params) =>
        this.legislatorService
        .getLegLatestVoteAction(params['bioguide_id']))
        .subscribe(votes => this.votes = votes);
  }

  getBioguideId(): void {
    this.route.params
      .subscribe(params => this.key = params['bioguide_id']);
  }

  onSelect(legislator: Legislator) {
    this.selectedLegislator = legislator;
  }
  // onSelect(legislator: Legislator) {
  //   this.selectedLegislator = legislator;
  // }

  setLegPortritUrl(id: string): string {
    let address = this.portraitUrl += (id + '.jpg');
    return address;
  }

  getLegPortraitUrl(): void {
    this.route.params
      .subscribe(params =>
      this.portraitUrl = this.setLegPortritUrl(params['bioguide_id']));
  }

  ngOnInit(): void {
    this.getLegislator();
    this.getSponsoredLegislation();
    this.getCosponsoredLegislation();
    this.getLegPortraitUrl();
    this.getVotedOnLegislation();
    this.getBioguideId();
    //this.allBills = this.sponsored.concat(this.cosponsored);
  }
  
  changeURL(): void {
	  this.portraitUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';
  }

  goToBill(bill_id: string): void {
    this.router.navigate(['/bill', bill_id]);
  }

  goBack(): void {
    this.location.back();
  }
}
