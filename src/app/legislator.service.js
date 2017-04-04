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
var Observable_1 = require('rxjs/Observable');
//import 'rxjs/add/operator/toPromise';
require('rxjs/add/operator/map');
require('rxjs/add/observable/throw');
var LegislatorService = (function () {
    function LegislatorService(jsonp) {
        this.jsonp = jsonp;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.baseUrl = 'https://congress.api.sunlightfoundation.com';
    }
    LegislatorService.prototype.getAllLegislators = function () {
        this.headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
        var res = this.jsonp.get(this.baseUrl + "/legislators?callback=JSONP_CALLBACK", { headers: this.headers })
            .map(function (response) { return response.json().results; });
        return res;
    };
    LegislatorService.prototype.getLegislatorById = function (bioguide_id) {
        var search = new http_1.URLSearchParams();
        search.set('bioguide_id', bioguide_id);
        var res = this.jsonp.get(this.baseUrl + "/legislators?callback=JSONP_CALLBACK", { search: search })
            .map(mapLegislators);
        //.catch(handleError);
        //.catch(this.handleError);
        return res;
    };
    LegislatorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Jsonp])
    ], LegislatorService);
    return LegislatorService;
}());
exports.LegislatorService = LegislatorService;
function mapLegislators(response) {
    // The response of the API has a results
    // property with the actual results
    console.log(response.json());
    return response.json().results;
}
function handleError(error) {
    // log error
    // could be something more sofisticated
    var errorMsg = error.message || "Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!";
    console.error(errorMsg);
    // throw an application level error
    return Observable_1.Observable.throw(errorMsg);
}
//# sourceMappingURL=legislator.service.js.map