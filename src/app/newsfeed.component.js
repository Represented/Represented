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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
var http_1 = require("@angular/http");
var legislator_service_1 = require("./legislator.service");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var NewsfeedComponent = (function () {
    function NewsfeedComponent(legislatorService, router, cookieService, location, jsonp) {
        this.legislatorService = legislatorService;
        this.router = router;
        this.cookieService = cookieService;
        this.location = location;
        this.jsonp = jsonp;
        this.portraitUrl = 'https://theunitedstates.io/images/congress/original/';
    }
    NewsfeedComponent.prototype.getMyRepData = function () {
        var _this = this;
        if (this.loc !== undefined) {
            console.log('lat long');
            this.legislatorService
                .getLegislatorByLocation(this.loc[0], this.loc[1])
                .subscribe(function (legislators) { return _this.legislators = legislators; });
        }
        else if (this.zip !== undefined) {
            console.log('zip');
            this.legislatorService
                .getLegislatorByZip(this.zip)
                .subscribe(function (legislators) { return _this.legislators = legislators; });
        }
    };
    NewsfeedComponent.prototype.getNewsfeedVoteAction = function () {
        for (var i = 0; i < this.repIds.length; i++) {
            this.getIndividualVoteAction(this.repIds[i]);
        }
    };
    NewsfeedComponent.prototype.getIndividualVoteAction = function (bioguide_id) {
        var _this = this;
        this.legislatorService
            .getLegLatestVoteAction(bioguide_id)
            .subscribe(function (votes) {
            if (_this.votes) {
                for (var i = 0; i < votes.length; i++) {
                    _this.votes.push(votes[i]);
                }
            }
            else {
                _this.votes = votes;
            }
        });
    };
    NewsfeedComponent.prototype.ngOnInit = function () {
        var representatives = this.cookieService.getObject('bioguides');
        var location = this.cookieService.getObject('longLat');
        console.log(location);
        var zip = this.cookieService.getObject('zipcode');
        if (representatives === undefined) {
            this.router.navigate(['/welcome']);
        }
        else {
            this.repIds = representatives.toString().split(',');
            if (location !== undefined) {
                this.loc = location.toString().split(',');
                console.log('test' + this.loc);
            }
            if (zip !== undefined) {
                this.zip = zip.toString();
            }
            this.getMyRepData();
            this.getNewsfeedVoteAction();
        }
    };
    NewsfeedComponent.prototype.goToBill = function (bill_id) {
        this.router.navigate(['/bill', bill_id]);
    };
    NewsfeedComponent.prototype.goToLegislator = function (bioguide_id) {
        this.router.navigate(['/legislator', bioguide_id]);
    };
    NewsfeedComponent.prototype.goBack = function () {
        this.location.back();
    };
    return NewsfeedComponent;
}());
NewsfeedComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        providers: [cookies_service_1.CookieService],
        selector: 'my-newsfeed',
        templateUrl: '../views/newsfeed.component.html',
        styleUrls: ['../styles/newsfeed.component.css']
    }),
    __metadata("design:paramtypes", [legislator_service_1.LegislatorService,
        router_1.Router,
        cookies_service_1.CookieService,
        common_1.Location,
        http_1.Jsonp])
], NewsfeedComponent);
exports.NewsfeedComponent = NewsfeedComponent;
//# sourceMappingURL=newsfeed.component.js.map