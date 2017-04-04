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
var legislator_service_1 = require('./legislator.service');
var LegislatorComponent = (function () {
    function LegislatorComponent(legislatorService, router) {
        this.legislatorService = legislatorService;
        this.router = router;
    }
    LegislatorComponent.prototype.getLegislator = function () {
        var _this = this;
        this.legislatorService
            .getLegislatorById("R000570")
            .subscribe(function (legislator) { return _this.legislator = legislator; });
        //console.log(this.legislator);
    };
    LegislatorComponent.prototype.getSponsoredLegislation = function () {
        var _this = this;
        this.legislatorService
            .getLegLatestSponsorAction("R000570")
            .subscribe(function (sponsored) { return _this.sponsored = sponsored; });
    };
    LegislatorComponent.prototype.getCosponsoredLegislation = function () {
        var _this = this;
        this.legislatorService
            .getLegLatestCosponsorAction("R000570")
            .subscribe(function (cosponsored) { return _this.cosponsored = cosponsored; });
    };
    LegislatorComponent.prototype.onSelect = function (legislator) {
        this.selectedLegislator = legislator;
    };
    // onSelect(legislator: Legislator) {
    //   this.selectedLegislator = legislator;
    // }
    LegislatorComponent.prototype.ngOnInit = function () {
        this.getLegislator();
    };
    LegislatorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-legislator',
            templateUrl: '../views/legislator.component.html',
            styleUrls: ['../styles/legislator.component.css']
        }), 
        __metadata('design:paramtypes', [legislator_service_1.LegislatorService, router_1.Router])
    ], LegislatorComponent);
    return LegislatorComponent;
}());
exports.LegislatorComponent = LegislatorComponent;
//# sourceMappingURL=legislator.component.js.map