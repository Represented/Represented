import { Component, OnInit }    from '@angular/core';
import { CookieService } 			  from 'angular2-cookie/services/cookies.service';
import { DataScrollerModule }   from 'primeng/primeng';
import { Jsonp } 					      from '@angular/http';
import { Legislator }           from './legislator';
import { LegislatorService }    from './legislator.service';
import { Location }             from '@angular/common';
import { RepAction }            from './repaction';
import { Router }               from '@angular/router';
import { Vote }                 from './vote';

@Component({
  moduleId: module.id,
  providers: [CookieService],
  selector: 'my-newsfeed',
  templateUrl: '../views/newsfeed.component.html',
  styleUrls: [ '../styles/newsfeed.component.css' ]
})
export class NewsfeedComponent implements OnInit {
  repIds: string[];
  legislators: Legislator[];
  votes: Vote[];

  constructor(
    private legislatorService: LegislatorService,
    private router: Router,
	  private cookieService: CookieService,
    private location: Location,
	  private jsonp: Jsonp) { }

  /*getActions(): void {
    this.repActionService
        .getActions()
        .then(repactions => this.repactions = repactions);
  }*/
  getMyRepData() {
    for(var i = 0; i < this.repIds.length; i++) {
      this.legislatorService
        .getLegislatorById(this.repIds[i])
        .subscribe(legislator => {
          if(this.legislators){
            this.legislators.push(legislator);
          } else {
            this.legislators = [];
            this.legislators[i] = legislator;
          }
        });
    }
  }

  getNewsfeedVoteAction() {
    for(let i = 0; i < this.repIds.length; i++) {
      this.getIndividualVoteAction(this.repIds[i]);
    }
  }

  getIndividualVoteAction(bioguide_id: string) {
    this.legislatorService
      .getLegLatestVoteAction(bioguide_id)
      .subscribe(votes => {
        if (this.votes) {
          for (let i = 0; i < votes.length; i++) {
            this.votes.push(votes[i]);
          }
        } else {
          this.votes = votes;
        }
      });
  }

  ngOnInit(): void {
		var representatives = this.cookieService.getObject('bioguides');
		if(representatives === undefined){
			this.router.navigate(['/welcome']);
		}
		else{
			this.repIds = representatives.toString().split(',');
      //this.getMyRepData();
			this.getNewsfeedVoteAction();
		}
  }

  goToBill(bill_id: string): void {
    this.router.navigate(['/bill', bill_id]);
  }

  goToLegislator(bioguide_id: string): void {
    this.router.navigate(['/legislator', bioguide_id]);
  }

  goBack(): void {
    this.location.back();
  }
}
