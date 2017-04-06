"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var cookies_service_js_1 = require('angular2-cookie/services/cookies.service.js');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var WelcomeComponent = (function () {
    function WelcomeComponent(cookieService, jsonp, router) {
        this.cookieService = cookieService;
        this.jsonp = jsonp;
        this.router = router;
        this.baseUrl = 'https://congress.api.sunlightfoundation.com';
        this.zipSubmissionForm = new forms_1.FormGroup({
            'zipcode': new forms_1.FormControl('zipcode', forms_1.Validators.required)
        });
    }
    WelcomeComponent.prototype.allowLocationServices = function () {
        var lat = 0;
        var lng = 0;
        var thisParent = this;
        navigator.geolocation.getCurrentPosition(function (position) {
            var _this = this;
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            //console.log("latitude: " + lat + ", longitude: " + lng);
            thisParent.cookieService.put('longLat', lng + ' ' + lat);
            console.log(thisParent.cookieService.get('longLat'));
            var search = new http_1.URLSearchParams();
            search.set('latitude', lat.toString());
            search.set('longitude', lng.toString());
            var res = thisParent.jsonp.get(thisParent.baseUrl + "/legislators/locate?callback=JSONP_CALLBACK", { search: search })
                .subscribe(function (response) {
                var returnReps = response.json().results;
                if (returnReps.length == 0) {
                    alert('Location not valid, please use zipcode');
                    _this.router.navigate(['/welcome']);
                }
                else {
                    var bioGuideArray = [];
                    returnReps.forEach(function (rep) {
                        bioGuideArray.push(rep.bioguide_id);
                    });
                    thisParent.cookieService.putObject('bioguides', bioGuideArray);
                    console.log(thisParent.cookieService.getObject('bioguides'));
                    thisParent.router.navigate(['/newsfeed']);
                }
            });
        });
    };
    WelcomeComponent.prototype.submitZip = function () {
        var _this = this;
        var zip = this.zipSubmissionForm.get('zipcode').value;
        this.cookieService.put('zipcode', zip);
        console.log(this.cookieService.get('zipcode'));
        var search = new http_1.URLSearchParams();
        search.set('zip', zip);
        var res = this.jsonp.get(this.baseUrl + "/legislators/locate?callback=JSONP_CALLBACK", { search: search })
            .subscribe(function (response) {
            var returnReps = response.json().results;
            if (returnReps.length == 0) {
                alert('Please give a valid zipcode');
                _this.router.navigate(['/welcome']);
            }
            else {
                var bioGuideArray = [];
                returnReps.forEach(function (rep) {
                    bioGuideArray.push(rep.bioguide_id);
                });
                _this.cookieService.putObject('bioguides', bioGuideArray);
                console.log(_this.cookieService.getObject('bioguides'));
                _this.router.navigate(['/newsfeed']);
            }
        });
    };
    WelcomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            providers: [cookies_service_js_1.CookieService],
            selector: 'my-welcome',
            templateUrl: '../views/welcome.component.html',
            styleUrls: ['../styles/welcome.component.css']
        }), 
        __metadata('design:paramtypes', [cookies_service_js_1.CookieService, http_1.Jsonp, router_1.Router])
    ], WelcomeComponent);
    return WelcomeComponent;
}());
exports.WelcomeComponent = WelcomeComponent;
//# sourceMappingURL=welcome.component.js.map