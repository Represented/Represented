import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent }       from './about.component';
import { BillComponent }        from './bill.component';
import { LegislatorComponent }  from './legislator.component';
import { NewsfeedComponent }    from './newsfeed.component';
import { SenateComponent }      from './senate.component';
import { WelcomeComponent}      from './welcome.component';

const routes: Routes = [
  { path: '', redirectTo: '/newsfeed', pathMatch: 'full' },
  { path: 'about',                       component: AboutComponent },
  { path: 'bill/:bill_id',               component: BillComponent },
  { path: 'legislator/:bioguide_id',     component: LegislatorComponent },
  { path: 'senate',                      component: SenateComponent },
  { path: 'newsfeed',                    component: NewsfeedComponent },
  { path: 'welcome',                     component: WelcomeComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
