import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    moduleId:module.id,
    selector: 'my-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['../scss/welcome.component.css']
})
export class WelcomeComponent{
    allowLocationServices(){
      var lat = 0;
      var lng = 0;

      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        console.log("latitude: " + lat + ", longitude: " + lng);
      });
    }

    public zipSubmissionForm = this.fb.group({
      zipcode: ["", Validators.required]
    });

    constructor(public fb: FormBuilder) {}

    submitZip(event) {
      var zip = "";

      zip = this.zipSubmissionForm.controls.zipcode.value;
      console.log("zip: " + this.zipSubmissionForm.controls.zipcode.value);
    }
}
