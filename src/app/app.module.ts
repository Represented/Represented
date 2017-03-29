import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { JsonpModule }   from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AboutComponent }       from './about.component';
import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { DataScrollerModule }   from 'primeng/primeng';
import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { HeroService }          from './hero.service';
import { HeroSearchComponent }  from './hero-search.component';
import { LegislatorComponent }  from './legislator.component';
import { LegislatorService }    from './legislator.service';
import { NewsfeedComponent }    from './newsfeed.component';
import { RepActionService }     from './repaction.service';
import { WelcomeComponent}      from './welcome.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    DataScrollerModule
  ],
  declarations: [
    AboutComponent,
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    LegislatorComponent,
    NewsfeedComponent,
    WelcomeComponent
  ],
  providers: [
    HeroService,
    LegislatorService,
    RepActionService
   ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
