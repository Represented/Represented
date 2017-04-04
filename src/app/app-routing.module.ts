import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent }       from './about.component';
import { LegislatorComponent }  from './legislator.component';
import { NewsfeedComponent }    from './newsfeed.component';
import { WelcomeComponent}      from './welcome.component';
import { LegislatorProfileComponent } from './legislator-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/newsfeed', pathMatch: 'full' },
  { path: 'about',        component: AboutComponent },
  { path: 'legislator',   component: LegislatorComponent },
  { path: 'newsfeed',     component: NewsfeedComponent },
  { path: 'welcome',      component: WelcomeComponent},
  { path: 'profile/:bioguide_id',      component: LegislatorProfileComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
