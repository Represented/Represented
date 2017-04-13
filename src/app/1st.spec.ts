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

import { AboutComponent }       from './about.component';
import { AppComponent }         from './app.component';
import { AppModule }            from './app.module';
import { AppRoutingModule }     from './app-routing.module';
import { BillComponent }        from './bill.component';
import { BillService }          from './bill.service';
import { CookieService }        from 'angular2-cookie/services/cookies.service';
import { DataScrollerModule }   from 'primeng/primeng';
import { LegislatorComponent }  from './legislator.component';
import { LegislatorService }    from './legislator.service';
import { NewsfeedComponent }    from './newsfeed.component';
import { RepActionService }     from './repaction.service';
import { WelcomeComponent }     from './welcome.component';

import { Headers, Http, Jsonp, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Bill } from './bill';
import { Legislator } from './legislator';
import { RepAction } from './repaction';
import { Vote } from './vote';
import { TestService } from './test.service';

describe('Test Suite 1: ', () => {

	beforeEach(() => {
		this.testService = new TestService();
		this.aboutComponent = new AboutComponent();
		this.appComponent = new AppComponent();
		this.bill = new Bill();
		this.billComponent = new BillComponent(null, null, null, null);
		this.billService = new BillService(null);
		this.legislator = new Legislator();
		this.legislatorComponent = new LegislatorComponent(null, null, null, null);
		this.legislatorService = new LegislatorService(null);
		this.newsfeedComponent = new NewsfeedComponent(null, null, null, null);
		this.repAction = new RepAction();
		this.repActionService = new RepActionService(null);
		this.vote = new Vote();
		this.welcomeComponent = new WelcomeComponent(null, null, null);
	});

  it('this.testService defined.', () => {
      expect(this.testService).toBeDefined();
  });

  it('this.testService named \"InjectedService\".', () => {
      expect(this.testService.name).toBe('InjectedService');
  });

  it('this.aboutComponent defined.', () => {
      expect(this.aboutComponent).toBeDefined();
  });

  it('this.appComponent defined.', () => {
      expect(this.appComponent).toBeDefined();
  });

  it('this.appComponent has correct title.', () => {
      expect(this.appComponent.title).toBe('epresented');
  });

  it('this.bill defined.', () => {
      expect(this.bill).toBeDefined();
  });

  it('this.billComponent defined.', () => {
      expect(this.billComponent).toBeDefined();
  });

  it('this.billService defined.', () => {
      expect(this.billService).toBeDefined();
  });

  it('obtain something from getBillById() if good id is used.', () => {
      var ret = this.billService.getBillById("hr1614-115");
      expect(ret).not.toBeNull();
  });

  it('this.legislator defined.', () => {
      expect(this.legislator).toBeDefined();
  });

  it('this.legislatorComponent defined.', () => {
      expect(this.legislatorComponent).toBeDefined();
  });

  it('this.legislatorService defined.', () => {
      expect(this.legislatorService).toBeDefined();
  });

  it('this.newsfeedComponent defined.', () => {
      expect(this.newsfeedComponent).toBeDefined();
  });

  it('this.repAction defined.', () => {
      expect(this.repAction).toBeDefined();
  });

  it('this.repActionService defined.', () => {
      expect(this.repActionService).toBeDefined();
  });

  it('this.vote defined.', () => {
      expect(this.vote).toBeDefined();
  });

  it('this.welcomeComponent defined.', () => {
      expect(this.welcomeComponent).toBeDefined();
  });

  it('Null latitude passed as argument to isValidLatLong.', () => {
      expect(this.welcomeComponent.isValidLatLong(null, 90)).toBe(false);
  });

  it('Null longitude passed as argument to isValidLatLong.', () => {
      expect(this.welcomeComponent.isValidLatLong(45, null)).toBe(false);
  });

  it('Out of range latitude passed as argument to isValidLatLong.', () => {
      expect(this.welcomeComponent.isValidLatLong(91, 90)).toBe(false);
  });

  it('Out of range longitude passed as argument to isValidLatLong.', () => {
      expect(this.welcomeComponent.isValidLatLong(45, -190)).toBe(false);
  });

  it('Latitude containing non-number passed as argument to isValidLatLong.', () => {
      expect(this.welcomeComponent.isValidLatLong('a3', -90)).toBe(false);
  });

  it('Longitude containing non-number passed as argument to isValidLatLong.', () => {
      expect(this.welcomeComponent.isValidLatLong(-45, '-3b')).toBe(false);
  });

  it('Valid latitude and longitude passed as argument to isValidLatLong.', () => {
      expect(this.welcomeComponent.isValidLatLong(45, 90)).toBe(true);
  });

  it('Valid latitude and longitude passed as argument to isValidLatLong.', () => {
      expect(this.welcomeComponent.isValidLatLong(-45, -90)).toBe(true);
  });

  it('Call handleAnyError() method in legislator service.', () => {
      expect(this.legislatorService.handleAnyError("error")).not.toBeNull();
  });

  it('Call handleError() method in legislator component.', () => {
      expect(this.legislatorComponent.setLegPortritUrl("test")).toEqual('https://theunitedstates.io/images/congress/original/test.jpg');
  });
});
