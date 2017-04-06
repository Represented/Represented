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
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var legislator_service_1 = require("./legislator.service");
var common_1 = require("@angular/common");
var LegislatorComponent = (function () {
    function LegislatorComponent(legislatorService, router, route, location) {
        this.legislatorService = legislatorService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.portraitUrl = 'https://theunitedstates.io/images/congress/original/';
    }
    LegislatorComponent.prototype.getLegislator = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) {
            return _this.legislatorService
                .getLegislatorById(params['bioguide_id']);
        })
            .subscribe(function (legislator) { return _this.legislator = legislator; });
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
    LegislatorComponent.prototype.onSelect = function (legislator) {
        this.selectedLegislator = legislator;
    };
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
        this.allBills = this.cosponsored.concat(this.sponsored);
    };
    LegislatorComponent.prototype.goToBill = function (bill_id) {
        this.router.navigate(['/bill', bill_id]);
    };
    LegislatorComponent.prototype.goBack = function () {
        this.location.back();
    };
    return LegislatorComponent;
}());
LegislatorComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-legislator',
        templateUrl: '../views/legislator.component.html',
        styleUrls: ['../styles/legislator.component.css']
    }),
    __metadata("design:paramtypes", [legislator_service_1.LegislatorService,
        router_1.Router,
        router_2.ActivatedRoute,
        common_1.Location])
], LegislatorComponent);
exports.LegislatorComponent = LegislatorComponent;
//# sourceMappingURL=legislator.component.js.map