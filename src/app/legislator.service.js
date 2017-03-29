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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/map');
var LegislatorService = (function () {
    function LegislatorService(jsonp) {
        this.jsonp = jsonp;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.legislatorUrl = 'https://congress.api.sunlightfoundation.com/legislators?callback=JSONP_CALLBACK';
    }
    LegislatorService.prototype.getLegislatorById = function (bioguide_id) {
        var search = new http_1.URLSearchParams();
        search.set('bioguide_id', bioguide_id);
        return this.jsonp.get(this.legislatorUrl, { search: search })
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    LegislatorService.prototype.getLegislatorTest = function (bioguide_id) {
        var search = new http_1.URLSearchParams();
        search.set('bioguide_id', bioguide_id);
        this.jsonp.get(this.legislatorUrl, { search: search })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log(data); });
    };
    LegislatorService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    LegislatorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Jsonp])
    ], LegislatorService);
    return LegislatorService;
}());
exports.LegislatorService = LegislatorService;
//# sourceMappingURL=legislator.service.js.map