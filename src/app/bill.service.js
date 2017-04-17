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
var BillService = (function () {
    function BillService(jsonp) {
        this.jsonp = jsonp;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.baseUrl = 'https://congress.api.sunlightfoundation.com';
        this.fields = "bill_id,bill_type,chamber,committee_ids,congress,cosponsors,cosponsors_count,enacted_as,history,introduced_on,last_action_at,last_version,last_version_on,last_vote_at,number,official_title,popular_title,related_bill_ids,short_title,sponsor,sponsor_id,urls,withdrawn_cosponsors_count";
    }
    BillService.prototype.getBillById = function (bill_id) {
        var search = new http_1.URLSearchParams();
        search.set('bill_id', bill_id);
        search.set('fields', this.fields);
        console.log(this.fields);
        var res = this.jsonp.get(this.baseUrl + "/bills?callback=JSONP_CALLBACK&bill_id", { search: search })
            .map(function (response) { return response.json().results; });
        return res;
    };
    return BillService;
}());
BillService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Jsonp])
], BillService);
exports.BillService = BillService;
function handleError(error) {
    // log error
    // could be something more sofisticated
    var errorMsg = error.message || "Yikes! There was was a problem and we couldn't retrieve your data!";
    console.error(errorMsg);
    // throw an application level error
    return Observable_1.Observable.throw(errorMsg);
}
//# sourceMappingURL=bill.service.js.map