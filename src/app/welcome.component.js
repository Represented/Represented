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
var WelcomeComponent = (function () {
    function WelcomeComponent() {
        this.zipSubmissionForm = new forms_1.FormGroup({
            'zipcode': new forms_1.FormControl('zipcode', forms_1.Validators.required)
        });
    }
    WelcomeComponent.prototype.allowLocationServices = function () {
        var lat = 0;
        var lng = 0;
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            console.log("latitude: " + lat + ", longitude: " + lng);
        });
    };
    WelcomeComponent.prototype.submitZip = function () {
        var zip = this.zipSubmissionForm.get('zipcode').value;
        console.log("zip: " + zip);
    };
    WelcomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-welcome',
            templateUrl: './welcome.component.html',
            styleUrls: ['../scss/welcome.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], WelcomeComponent);
    return WelcomeComponent;
}());
exports.WelcomeComponent = WelcomeComponent;
//# sourceMappingURL=welcome.component.js.map