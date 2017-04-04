import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { JsonpModule }   from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AboutComponent }       from './about.component';
import { AppComponent}          from './app.component';
import { DataScrollerModule }   from 'primeng/primeng';
import { LegislatorComponent }  from './legislator.component';
import { LegislatorService }    from './legislator.service';
import { NewsfeedComponent }    from './newsfeed.component';
import { RepActionService }     from './repaction.service';
import { WelcomeComponent}      from './welcome.component';
import { LegislatorProfileComponent}  from './legislator-profile.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
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
    WelcomeComponent,
    LegislatorProfileComponent
  ],
  providers: [
    LegislatorService,
    RepActionService
   ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
