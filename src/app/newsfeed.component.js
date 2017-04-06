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
var router_1 = require('@angular/router');
var repaction_service_1 = require('./repaction.service');
var cookies_service_1 = require('angular2-cookie/services/cookies.service');
var http_1 = require('@angular/http');
var NewsfeedComponent = (function () {
    function NewsfeedComponent(repActionService, router, cookieService, jsonp) {
        this.repActionService = repActionService;
        this.router = router;
        this.cookieService = cookieService;
        this.jsonp = jsonp;
    }
    /*getActions(): void {
      this.repActionService
          .getActions()
          .then(repactions => this.repactions = repactions);
    }*/
    NewsfeedComponent.prototype.ngOnInit = function () {
        var representatives = this.cookieService.getObject('bioguides');
        if (representatives === undefined) {
            this.router.navigate(['/welcome']);
        }
        this.legislators = representatives.toString().split(',');
        console.log(this.legislators);
    };
    NewsfeedComponent.prototype.goToLegislator = function (bioguide_id) {
        this.router.navigate(['/legislator', bioguide_id]);
    };
    NewsfeedComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            providers: [cookies_service_1.CookieService],
            selector: 'my-newsfeed',
            templateUrl: '../views/newsfeed.component.html',
            styleUrls: ['../styles/newsfeed.component.css']
        }), 
        __metadata('design:paramtypes', [repaction_service_1.RepActionService, router_1.Router, cookies_service_1.CookieService, http_1.Jsonp])
    ], NewsfeedComponent);
    return NewsfeedComponent;
}());
exports.NewsfeedComponent = NewsfeedComponent;
//# sourceMappingURL=newsfeed.component.js.map