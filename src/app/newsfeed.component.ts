import { Component, OnInit }    from '@angular/core';
import { CookieService } 			  from 'angular2-cookie/services/cookies.service';
import { DataScrollerModule }   from 'primeng/primeng';
import { Jsonp } 					      from '@angular/http';
import { Legislator }           from './legislator';
import { LegislatorService }    from './legislator.service';
import { Location }             from '@angular/common';
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
  loc: string[];
  zip: string;
  legislators: Legislator[];
  votes: Vote[];
  portraitUrl = 'https://theunitedstates.io/images/congress/original/';

  constructor(
    private legislatorService: LegislatorService,
    private router: Router,
	  private cookieService: CookieService,
    private location: Location,
	  private jsonp: Jsonp) { }

  getMyRepData() {
    if (this.loc !== undefined) {
      console.log('lat long');
      this.legislatorService
        .getLegislatorByLocation(this.loc[0], this.loc[1])
        .subscribe(legislators => this.legislators = legislators);
    } else if (this.zip !== undefined) {
      console.log('zip');
      this.legislatorService
        .getLegislatorByZip(this.zip)
        .subscribe(legislators => this.legislators = legislators);
    }
  }

  getNewsfeedVoteAction() {
    for(let i = 0; i < this.repIds.length; i++) {
      this.getIndividualVoteAction(this.repIds[i]);
    }
	/*
	this.votes.sort((a,b) => {
		return a.voted_at - b.voted_at;
	});
	*/
  }

  getIndividualVoteAction(bioguide_id: string) {
    this.legislatorService
      .getLegLatestVoteAction(bioguide_id)
      .subscribe(votes => {
        if (this.votes) {
          for (let i = 0; i < votes.length; i++) {
            this.votes.push(votes[i]);
          }
		  this.votes.sort((a,b) => {
			return a.voted_at - b.voted_at;
		  });
        } else {
          this.votes = votes;
        }
      });
  }

  ngOnInit(): void {
		var representatives = this.cookieService.getObject('bioguides');
    var location = this.cookieService.getObject('longLat');
    console.log(location);
    var zip = this.cookieService.getObject('zipcode');
		if(representatives === undefined){
			this.router.navigate(['/welcome']);
		}
		else{
			this.repIds = representatives.toString().split(',');
      if (location !== undefined) {
        this.loc = location.toString().split(',');
        console.log('test' + this.loc);
      }
      if (zip !== undefined) {
        this.zip = zip.toString();
      }
      this.getMyRepData();
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
