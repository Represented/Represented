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


import { AppRoutingModule } from './app-routing.module';

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

import { Legislator } from './legislator';

import { TestService } from './test.service';

describe('1st tests', () => {

	beforeEach(() => {
		this.testService = new TestService();
		//this.legislatorService = new LegislatorService();
	});

	it('Hello, I\'m a test!', () => expect(true).toBe(true));

	it('Hello, this will fail. Just like Charlie.', () => expect(this.testService.name).toBe('InjectedService'));

	xit('Hello, this will fail. Just like Charlie.', () => expect(this.legislatorService).not.toBeNull());
});
