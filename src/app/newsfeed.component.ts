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
	let promArr = <any>[];
    for(let i = 0; i < this.repIds.length; i++) {
      promArr.push(this.getIndividualVoteAction(this.repIds[i]));
    }
	Promise.all(promArr).then(function () {
		console.log('promArr done');
	});
  }

  getIndividualVoteAction(bioguide_id: string) {
    this.legislatorService
      .getLegLatestVoteAction(bioguide_id)
      .subscribe(votes => {
        if (this.votes) {
          for (let i = 0; i < votes.length; i++) {
			  for (let j = 0; j < this.votes.length; j++){
				  //console.log(votes[i]);
				  //console.log(this.votes[i]);
				if(votes[i].voted_at > this.votes[j].voted_at){
					//console.log('inserting ' + votes[i].voted_at + ' before ' + this.votes[j].voted_at);
					this.votes.splice(j,0,votes[i]);
					break;
				}
				else if(j == this.votes.length - 1){
					this.votes.push(votes[i]);
					break;
				}
			  }
          }
        } else {
          this.votes = votes;
        }
      });
  }

  ngOnInit(): void {
		var representatives = this.cookieService.getObject('bioguides');
    var location = this.cookieService.getObject('longLat');
    console.log(location);
    var zip = this.cookieService.get('zipcode');
		if(representatives === undefined || (location === undefined && zip === undefined)){
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
  
  loadData(event: any){
	  var representatives = this.cookieService.getObject('bioguides');
    var location = this.cookieService.getObject('longLat');
    console.log(location);
    var zip = this.cookieService.get('zipcode');
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
  
  changeURL($event: any): void {
	  $event.srcElement.parentElement.innerHTML = '<img style="display: block; margin: auto;" height="100px" width="90px" _ngcontent-hqe-19="" ng-reflect-src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png">'
	  console.log($event);
	  //this.portraitUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';
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
