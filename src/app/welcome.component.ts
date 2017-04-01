import { Component } from '@angular/core';

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
}
