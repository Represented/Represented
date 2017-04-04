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
require('rxjs/add/operator/switchMap');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var legislator_1 = require('./legislator');
var legislator_service_1 = require('./legislator.service');
var common_1 = require('@angular/common');
var LegislatorProfileComponent = (function () {
    function LegislatorProfileComponent(legislatorService, route, location, service) {
        this.legislatorService = legislatorService;
        this.route = route;
        this.location = location;
        this.service = service;
        this.rep = new legislator_1.Legislator();
    }
    LegislatorProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this.route.snapshot.params['bioguide_id'];
        this.route.params
            .switchMap(function (params) { return _this.service.getLegislatorById(id); })
            .subscribe(function (leg) { return _this.rep = leg; });
        console.log(id);
        console.log(this.rep.first_name);
    };
    LegislatorProfileComponent.prototype.goBack = function () {
        this.location.back();
    };
    LegislatorProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'legislator-profile',
            templateUrl: '../views/legislator-profile.component.html',
            styleUrls: ['../styles/legislator-profile.component.css']
        }), 
        __metadata('design:paramtypes', [legislator_service_1.LegislatorService, router_1.ActivatedRoute, common_1.Location, legislator_service_1.LegislatorService])
    ], LegislatorProfileComponent);
    return LegislatorProfileComponent;
}());
exports.LegislatorProfileComponent = LegislatorProfileComponent;
//# sourceMappingURL=legislator-profile.component.js.map