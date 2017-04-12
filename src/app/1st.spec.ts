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

describe('Test Suite 1: ', () => {

	beforeEach(() => {
		this.testService = new TestService();
    this.legislator = new Legislator();
    this.legislatorService = new LegislatorService(null);
    this.legislatorComponent = new LegislatorComponent(null, null, null, null);
    this.welcomeComponent = new WelcomeComponent(null, null, null);
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

  it('this.legislatorService defined.', () => {
      expect(this.legislatorService).toBeDefined();
  });

  it('this.legislatorComponent defined.', () => {
      expect(this.legislatorComponent).toBeDefined();
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
