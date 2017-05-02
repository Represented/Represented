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
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
var VoteService = (function () {
    function VoteService(jsonp) {
        this.jsonp = jsonp;
        this.baseUrl = 'https://congress.api.sunlightfoundation.com';
        this.vote_fields = "bill_id,bill,question,required,result,roll_id,nomination,vote_type,voted_at,voters,breakdown";
    }
    VoteService.prototype.getsVotesByBillID = function (bill_id) {
        var search = new http_1.URLSearchParams();
        search.set('bill_id', bill_id);
        search.set('fields', this.vote_fields);
        var res = this.jsonp.get(this.baseUrl + "/votes?callback=JSONP_CALLBACK", { search: search })
            .map(function (response) { return response.json().results; });
        return res;
    };
    return VoteService;
}());
VoteService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Jsonp])
], VoteService);
exports.VoteService = VoteService;
function handleError(error) {
    // log error
    // could be something more sofisticated
    var errorMsg = error.message || "Yikes! There was was a problem and we couldn't retrieve your data!";
    console.error(errorMsg);
    // throw an application level error
    return Observable_1.Observable.throw(errorMsg);
}
//# sourceMappingURL=vote.service.js.map