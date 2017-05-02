import { Component } from '@angular/core';
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
      'zipcode': new FormControl('', Validators.required)
    });

    allowLocationServices(){
      var lat = 0;
      var lng = 0;

	  var thisParent = this;

      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        var location:any = [];
        location.push(lng.toString());
        location.push(lat.toString());
        //console.log("latitude: " + lat + ", longitude: " + lng);
		thisParent.cookieService.putObject('longLat', location);
		thisParent.cookieService.remove('zipcode');
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

      });
    }

    submitZip() {
		var zip = this.zipSubmissionForm.get('zipcode').value;
		this.cookieService.put('zipcode', zip);
		this.cookieService.remove('longLat');
		console.log(this.cookieService.get('zipcode'));

		var search = new URLSearchParams();
		search.set('zip', zip);


		let res = this.jsonp.get(`${this.baseUrl}/legislators/locate?callback=JSONP_CALLBACK`, { search })
                .subscribe((response: any) =>{
				    var returnReps = response.json().results;
					if(returnReps.length == 0){
						this.cookieService.remove('zipcode');
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

}
