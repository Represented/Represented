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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
//import 'rxjs/add/operator/toPromise';
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
var LegislatorService = (function () {
    // private photoUrl = 'https://theunitedstates.io/images/congress/orignal/';
    function LegislatorService(jsonp) {
        this.jsonp = jsonp;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.baseUrl = 'https://congress.api.sunlightfoundation.com';
    }
    LegislatorService.prototype.getAllHouseLegislators = function (page) {
        var search = new http_1.URLSearchParams();
        search.set('chamber', 'house');
        search.set('order', 'last_name__asc');
        search.set('page', page);
        var res = this.jsonp.get(this.baseUrl + "/legislators?callback=JSONP_CALLBACK", { search: search })
            .map(function (response) { return response.json().results; });
        return res;
    };
    LegislatorService.prototype.getAllSenateLegislators = function (page) {
        var search = new http_1.URLSearchParams();
        search.set('chamber', 'senate');
        search.set('order', 'last_name__asc');
        search.set('page', page);
        var res = this.jsonp.get(this.baseUrl + "/legislators?callback=JSONP_CALLBACK", { search: search })
            .map(function (response) { return response.json().results; });
        return res;
    };
    LegislatorService.prototype.getLegislatorById = function (bioguide_id) {
        var search = new http_1.URLSearchParams();
        search.set('bioguide_id', bioguide_id);
        var res = this.jsonp.get(this.baseUrl + "/legislators?callback=JSONP_CALLBACK", { search: search })
            .map(function (response) { return response.json().results; });
        return res;
    };
    LegislatorService.prototype.getLegislatorByZip = function (zip) {
        var search = new http_1.URLSearchParams();
        search.set('zip', zip);
        var res = this.jsonp.get(this.baseUrl + "/legislators/locate?callback=JSONP_CALLBACK", { search: search })
            .map(function (response) { return response.json().results; });
        return res;
    };
    LegislatorService.prototype.getLegislatorByLocation = function (longitude, latitude) {
        var search = new http_1.URLSearchParams();
        search.set('latitude', latitude);
        search.set('longitude', longitude);
        var res = this.jsonp.get(this.baseUrl + "/legislators/locate?callback=JSONP_CALLBACK", { search: search })
            .map(function (response) { return response.json().results; });
        return res;
    };
    LegislatorService.prototype.getLegLatestSponsorAction = function (bioguide_id) {
        var search = new http_1.URLSearchParams();
        search.set('sponsor_id', bioguide_id);
        search.set('order', 'introduced_on');
        var res = this.jsonp.get(this.baseUrl + "/bills?callback=JSONP_CALLBACK", { search: search })
            .map(function (response) { return response.json().results; });
        return res;
    };
    LegislatorService.prototype.getLegLatestCosponsorAction = function (bioguide_id) {
        var search = new http_1.URLSearchParams();
        search.set('cosponsor_ids', bioguide_id);
        search.set('order', 'introduced_on');
        var res = this.jsonp.get(this.baseUrl + "/bills?callback=JSONP_CALLBACK", { search: search })
            .map(function (response) { return response.json().results; });
        return res;
    };
    LegislatorService.prototype.getLegLatestVoteAction = function (bioguide_id, page) {
        var search = new http_1.URLSearchParams();
        search.set('voter_ids.' + bioguide_id + '__exists', 'true');
        search.set('bill_id__exists', 'true');
        search.set('fields', 'roll_id,bill,voted_at,vote_type,required,result,question,voters.' + bioguide_id + '.vote');
        search.set('page', page);
        search.set('order', 'voted_at');
        console.log(search);
        var res = this.jsonp.get(this.baseUrl + "/votes?callback=JSONP_CALLBACK", { search: search })
            .map(function (response) { return response.json().results; });
        return res;
    };
    return LegislatorService;
}());
LegislatorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Jsonp])
], LegislatorService);
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