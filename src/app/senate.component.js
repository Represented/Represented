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
var common_1 = require('@angular/common');
var SenateComponent = (function () {
    function SenateComponent(legislatorService, router, location) {
        this.legislatorService = legislatorService;
        this.router = router;
        this.location = location;
        this.portraitUrl = 'https://theunitedstates.io/images/congress/original/';
    }
    SenateComponent.prototype.getSenateLegislators = function () {
        var _this = this;
        this.legislatorService
            .getAllSenateLegislators(this.page.toString())
            .subscribe(function (legislators) { return _this.legislators = legislators; });
    };
    SenateComponent.prototype.getMoreLegislators = function () {
        var _this = this;
        this.legislatorService
            .getAllSenateLegislators(this.page.toString())
            .subscribe(function (legislators) {
            for (var i = 0; i < legislators.length; i++) {
                _this.legislators.push(legislators[i]);
            }
        });
    };
    SenateComponent.prototype.onSelect = function (legislator) {
        this.selectedLegislator = legislator;
    };
    // onSelect(legislator: Legislator) {
    //   this.selectedLegislator = legislator;
    // }
    SenateComponent.prototype.ngOnInit = function () {
        this.page = 1;
        //this.getSenateLegislators();
    };
    SenateComponent.prototype.loadData = function (event) {
        if (!this.legislators) {
            this.getSenateLegislators();
            this.page++;
        }
        else {
            this.getMoreLegislators();
            this.page++;
        }
    };
    SenateComponent.prototype.goToLegislator = function (bioguide_id) {
        this.router.navigate(['/legislator', bioguide_id]);
    };
    SenateComponent.prototype.goBack = function () {
        this.location.back();
    };
    SenateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-senate',
            templateUrl: '../views/senate.component.html',
            styleUrls: ['../styles/house-senate.component.css']
        }), 
        __metadata('design:paramtypes', [legislator_service_1.LegislatorService, router_1.Router, common_1.Location])
    ], SenateComponent);
    return SenateComponent;
}());
exports.SenateComponent = SenateComponent;
//# sourceMappingURL=senate.component.js.map