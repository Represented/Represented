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
	});

	it('Hello, I\'m a test!', () => {
		expect(true).toBe(true);
	});

        it('This will succeed. Unlike Charlie.', () => {
                expect(this.testService).toBeDefined();
        });

	it('This will succeed. Unlike Charlie.', () => {
		expect(this.testService.name).toBe('InjectedService');
	});

        it('This will fail. Just like Charlie.', inject([LegislatorService], (legislatorService: LegislatorService) => {
                expect(this.legislatorService).toBeDefined();
        }));

	it('This will fail. Just like Charlie.', inject([LegislatorService], (legislatorService: LegislatorService) => {
		expect(this.legislatorService.getLegislatorById('B001230')).not.toBeNull();
	}));
});
