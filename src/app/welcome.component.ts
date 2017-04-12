import { Component } from '@angular/core';
import {Injectable} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Headers, Http, Jsonp, Response, URLSearchParams } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { Router } from '@angular/router';

import { Legislator } from './legislator';

@Component({
    moduleId:module.id,
	  providers: [CookieService],
    selector: 'my-welcome',
    templateUrl: '../views/welcome.component.html',
    styleUrls: ['../styles/welcome.component.css']
})
export class WelcomeComponent{

	private baseUrl = 'https://congress.api.sunlightfoundation.com';

	constructor(private cookieService: CookieService,
	private jsonp: Jsonp,
	private router: Router){}

    public zipSubmissionForm = new FormGroup({
      'zipcode': new FormControl('zipcode', Validators.required)
    });

    allowLocationServices(){
      var lat = 0;
      var lng = 0;
	    var thisParent = this;

      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        // if(this.isValidLatLong(lat, lng)){ TODO: uncomment after this has been verified
  		    thisParent.cookieService.put('longLat', lng + ' ' + lat);
  		    console.log(thisParent.cookieService.get('longLat'));

  		    var search = new URLSearchParams();

  		    search.set('latitude', lat.toString());
  		    search.set('longitude', lng.toString());

  		    let res = thisParent.jsonp.get(`${thisParent.baseUrl}/legislators/locate?callback=JSONP_CALLBACK`, { search })
                  .subscribe((response: any) =>{
  			    var returnReps = response.json().results;
  					if(returnReps.length == 0){
  						alert('Location not valid, please use zipcode');
  						this.router.navigate(['/welcome']);
  					}
  					else{
  						var bioGuideArray:any = [];
  						returnReps.forEach((rep: any) => {
  							bioGuideArray.push(rep.bioguide_id);
  						});
  						thisParent.cookieService.putObject('bioguides', bioGuideArray);
  						console.log(thisParent.cookieService.getObject('bioguides'));
  						thisParent.router.navigate(['/newsfeed']);
  					}
          });
        //} TODO: uncomment after this has been verified
      });
    }

    submitZip() {
		var zip = this.zipSubmissionForm.get('zipcode').value;
		this.cookieService.put('zipcode', zip);
		console.log(this.cookieService.get('zipcode'));

		var search = new URLSearchParams();
		search.set('zip', zip);


		let res = this.jsonp.get(`${this.baseUrl}/legislators/locate?callback=JSONP_CALLBACK`, { search })
                .subscribe((response: any) =>{
				    var returnReps = response.json().results;
					if(returnReps.length == 0){
						alert('Please give a valid zipcode');
						this.router.navigate(['/welcome']);
					}
					else{
						var bioGuideArray:any = [];
						returnReps.forEach((rep: any) => {
							bioGuideArray.push(rep.bioguide_id);
						});
						this.cookieService.putObject('bioguides', bioGuideArray);
						console.log(this.cookieService.getObject('bioguides'));
						this.router.navigate(['/newsfeed']);
					}
			    });
    }

    public isValidLatLong(latitude: any, longitude: any){
      if(typeof latitude != "number" || typeof longitude != "number")
        return false;
      if(latitude == null || longitude == null)
        return false;
      if(latitude > 90 || latitude < -90 || longitude > 180 || longitude < -180)
        return false;
      return true;
    }

}
