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
require('zone.js');
require('reflect-metadata');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
//import 'rxjs/add/operator/toPromise';
require('rxjs/add/operator/map');
require('rxjs/add/observable/throw');
var LegislatorService = (function () {
    // private photoUrl = 'https://theunitedstates.io/images/congress/orignal/';
    function LegislatorService(jsonp) {
        this.jsonp = jsonp;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.baseUrl = 'https://congress.api.sunlightfoundation.com';
    }
    LegislatorService.prototype.getLegislatorById = function (bioguide_id) {
        var search = new http_1.URLSearchParams();
        search.set('bioguide_id', bioguide_id);
        var res = this.jsonp.get(this.baseUrl + "/legislators?callback=JSONP_CALLBACK", { search: search })
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
    LegislatorService.prototype.getLegLatestVoteAction = function (bioguide_id) {
        var search = new http_1.URLSearchParams();
        search.set('voter_ids.' + bioguide_id + '__exists', 'true');
        search.set('fields', 'roll_id,bill,voted_at,vote_type,nomination,required,result,question,voters.' + bioguide_id + '.vote');
        search.set('order', 'voted_at');
        console.log(search);
        var res = this.jsonp.get(this.baseUrl + "/votes?callback=JSONP_CALLBACK", { search: search })
            .map(function (response) { return response.json().results; });
        return res;
    };
    // getLegPortraitUrl(bioguide_id: string): <string> {
    //   return this.photoUrl + bioguide_id;
    // }
    /*getLegislatorTest(bioguide_id: string) {
      var search = new URLSearchParams()
      search.set('bioguide_id', bioguide_id);
      this.jsonp.get(this.legislatorUrl, { search })
        .map(res => res.json())
        .subscribe(data => console.log(data));
    }*/
    /*private handleError(error: any): Observable<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Observable.throw(error.message || error);
    }
    private handleError (error: any) {
      // log error
      // could be something more sofisticated
      let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
      console.error(errorMsg);
  
      // throw an application level error
      return Observable.throw(errorMsg);
    }*/
    LegislatorService.prototype.handleAnyError = function (error) {
        handleError(error);
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