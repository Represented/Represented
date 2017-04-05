import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { RepAction }                from './repaction';
import { RepActionService }         from './repaction.service';
import { DataScrollerModule }       from 'primeng/primeng';
import { CookieService } 			from 'angularCookie';
import { Jsonp } 					from '@angular/http';

@Component({
  moduleId: module.id,
  providers: [CookieService];
  selector: 'my-newsfeed',
  templateUrl: '../views/newsfeed.component.html',
  styleUrls: [ '../styles/newsfeed.component.css' ]
})
export class NewsfeedComponent implements OnInit {
  repactions: RepAction[];

  constructor(
    private repActionService: RepActionService,
    private router: Router
	private cookieService: CookieService
	private jsonp: Jsonp) { }

  /*getActions(): void {
    this.repActionService
        .getActions()
        .then(repactions => this.repactions = repactions);
  }*/
  ngOnInit(): void {
	var representatives = this.cookieService.getObject('bioguides');
	if(representatives === undefined){
		this.router.navigate(['/welcome']);
	}
  }
}
