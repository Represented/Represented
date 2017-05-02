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
var router_2 = require('@angular/router');
var legislator_service_1 = require('./legislator.service');
var common_1 = require('@angular/common');
var LegislatorComponent = (function () {
    function LegislatorComponent(legislatorService, router, route, location) {
        this.legislatorService = legislatorService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.key = String;
        this.portraitUrl = 'https://theunitedstates.io/images/congress/original/';
    }
    LegislatorComponent.prototype.getLegislator = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) {
            return _this.legislatorService
                .getLegislatorById(params['bioguide_id']);
        })
            .subscribe(function (legislator) {
            _this.legislator = legislator;
            /*
            //capitalize chamber
            if(legislator[0].chamber == 'senate') this.legislator.chamber = 'Senate';
            if(legislator[0].chamber == 'house') this.legislator.chamber = 'House';
            //more readable dates
            let termStart: string = legislator[0].term_start;
            let termEnd: string = legislator[0].term_end;
            let timeSplitStart: string[] = termStart.split('-');
            let timeSplitEnd: string[] = termEnd.split('-');
            timeSplitStart[1] = timeSplitStart[1] + '-';
            timeSplitStart[2] = timeSplitStart[2] + '-';
            timeSplitEnd[1] = timeSplitEnd[1] + '-';
            timeSplitEnd[2] = timeSplitEnd[2] + '-';
            this.legislator.term_start = timeSplitStart[1].concat(timeSplitStart[2].concat(timeSplitStart[0]));
            this.legislator.term_end = timeSplitEnd[1].concat(timeSplitEnd[2].concat(timeSplitEnd[0]));
            */
        });
    };
    LegislatorComponent.prototype.getSponsoredLegislation = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) {
            return _this.legislatorService
                .getLegLatestSponsorAction(params['bioguide_id']);
        })
            .subscribe(function (sponsored) { return _this.sponsored = sponsored; });
    };
    LegislatorComponent.prototype.getCosponsoredLegislation = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) {
            return _this.legislatorService
                .getLegLatestCosponsorAction(params['bioguide_id']);
        })
            .subscribe(function (cosponsored) { return _this.cosponsored = cosponsored; });
    };
    LegislatorComponent.prototype.getVotedOnLegislation = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) {
            return _this.legislatorService
                .getLegLatestVoteAction(params['bioguide_id']);
        })
            .subscribe(function (votes) { return _this.votes = votes; });
    };
    LegislatorComponent.prototype.getBioguideId = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) { return _this.key = params['bioguide_id']; });
    };
    LegislatorComponent.prototype.onSelect = function (legislator) {
        this.selectedLegislator = legislator;
    };
    // onSelect(legislator: Legislator) {
    //   this.selectedLegislator = legislator;
    // }
    LegislatorComponent.prototype.setLegPortritUrl = function (id) {
        var address = this.portraitUrl += (id + '.jpg');
        return address;
    };
    LegislatorComponent.prototype.getLegPortraitUrl = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            return _this.portraitUrl = _this.setLegPortritUrl(params['bioguide_id']);
        });
    };
    LegislatorComponent.prototype.ngOnInit = function () {
        this.getLegislator();
        this.getSponsoredLegislation();
        this.getCosponsoredLegislation();
        this.getLegPortraitUrl();
        this.getVotedOnLegislation();
        this.getBioguideId();
        //this.allBills = this.sponsored.concat(this.cosponsored);
    };
    LegislatorComponent.prototype.changeURL = function () {
        this.portraitUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png';
    };
    LegislatorComponent.prototype.goToBill = function (bill_id) {
        this.router.navigate(['/bill', bill_id]);
    };
    LegislatorComponent.prototype.goBack = function () {
        this.location.back();
    };
    LegislatorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-legislator',
            templateUrl: '../views/legislator.component.html',
            styleUrls: ['../styles/legislator.component.css']
        }), 
        __metadata('design:paramtypes', [legislator_service_1.LegislatorService, router_1.Router, router_2.ActivatedRoute, common_1.Location])
    ], LegislatorComponent);
    return LegislatorComponent;
}());
exports.LegislatorComponent = LegislatorComponent;
//# sourceMappingURL=legislator.component.js.map