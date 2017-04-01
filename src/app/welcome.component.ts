import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    moduleId:module.id,
    selector: 'my-welcome',
    templateUrl: '../views/welcome.component.html',
    styleUrls: ['../styles/welcome.component.css']
})
export class WelcomeComponent{

    public zipSubmissionForm = new FormGroup({
      'zipcode': new FormControl('zipcode', Validators.required)
    });

    allowLocationServices(){
      var lat = 0;
      var lng = 0;

      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        console.log("latitude: " + lat + ", longitude: " + lng);
      });
    }

    submitZip() {
      var zip = this.zipSubmissionForm.get('zipcode').value;

      console.log("zip: " + zip);
    }

}
