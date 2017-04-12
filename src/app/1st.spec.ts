import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import {
    FormGroup
} from '@angular/forms';
import {
    TestBed
} from '@angular/core/testing';

import { AppModule }            from './app.module';
import { AppRoutingModule }     from './app-routing.module';
import { CookieService }        from 'angular2-cookie/services/cookies.service';
import { AboutComponent }       from './about.component';
import { AppComponent }         from './app.component';
import { BillComponent }        from './bill.component';
import { BillService }          from './bill.service';
import { DataScrollerModule }   from 'primeng/primeng';
import { LegislatorComponent }  from './legislator.component';
import { LegislatorService }    from './legislator.service';
import { NewsfeedComponent }    from './newsfeed.component';
import { RepActionService }     from './repaction.service';
import { WelcomeComponent }     from './welcome.component';

import { Headers, Http, Jsonp, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Legislator } from './legislator';
import { TestService } from './test.service';

describe('Test Suite A: ', () => {

	beforeEach(() => {
		this.testService = new TestService();
    this.legislator = new Legislator();
    this.legislatorService = new LegislatorService(null);
    this.legislatorComponent = new LegislatorComponent(null, null, null, null);
	});

  it('this.testService defined.', () => {
      expect(this.testService).toBeDefined();
  });

  it('this.legislator defined.', () => {
      expect(this.legislator).toBeDefined();
  });

	it('this.testService named \"InjectedService\".', () => {
		  expect(this.testService.name).toBe('InjectedService');
	});

  it('this.legislatorService not null.', () => {
      expect(this.legislatorService).not.toBeNull();
  });

  it('this.legislatorComponent not null.', () => {
      expect(this.legislatorComponent).not.toBeNull();
  });

	it('Call handleAnyError() method in legislator service.', () => {
		  expect(this.legislatorService.handleAnyError("error")).not.toBeNull();
	});

  it('Call handleError() method in legislator component.', () => {
		  expect(this.legislatorComponent.setLegPortritUrl("test")).toEqual('https://theunitedstates.io/images/congress/original/test.jpg');
	});
});
