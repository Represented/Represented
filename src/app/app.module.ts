import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { JsonpModule }   from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { CookieService }        from 'angular2-cookie/services/cookies.service';

import { AboutComponent }       from './about.component';
import { AppComponent }         from './app.component';
import { DataScrollerModule }   from 'primeng/primeng';
import { LegislatorComponent }  from './legislator.component';
import { LegislatorService }    from './legislator.service';
import { NewsfeedComponent }    from './newsfeed.component';
import { RepActionService }     from './repaction.service';
import { WelcomeComponent}      from './welcome.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    DataScrollerModule
  ],
  declarations: [
    AboutComponent,
    AppComponent,
    LegislatorComponent,
    NewsfeedComponent,
    WelcomeComponent
  ],
  providers: [
    LegislatorService,
    RepActionService,
	CookieService
   ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }