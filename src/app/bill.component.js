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
var bill_service_1 = require("./bill.service");
var common_1 = require("@angular/common");
var vote_service_1 = require("./vote.service");
require("rxjs/add/operator/switchMap");
var BillComponent = (function () {
    function BillComponent(billService, voteService, route, location, router) {
        this.billService = billService;
        this.voteService = voteService;
        this.route = route;
        this.location = location;
        this.router = router;
    }
    BillComponent.prototype.getBill = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) {
            return _this.billService
                .getBillById(params['bill_id']);
        })
            .subscribe(function (bill) { return _this.bill = bill; });
    };
    BillComponent.prototype.getVote = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) {
            return _this.voteService
                .getsVotesByBillID(params['bill_id']);
        })
            .subscribe(function (vote) { return (_this.vote = vote,
            _this.Yea = vote[0].breakdown.total.Yea,
            _this.Nay = vote[0].breakdown.total.Nay,
            _this.Not_Voting = vote[0].breakdown.total.Not_Voting,
            _this.Present = vote[0].breakdown.total.Not_Voting); });
        this.setData(this.Yea, this.Nay, this.Not_Voting, this.Present);
    };
    BillComponent.prototype.setData = function (Yea, Nay, Not_Voting, Present) {
        this.data = {
            labels: ['Yea', 'Nay', 'Not Voting', 'Present'],
            datasets: [
                {
                    data: [Yea, Nay, Not_Voting, Present],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }
            ]
        };
    };
    BillComponent.prototype.ngOnInit = function () {
        this.getBill();
        this.getVote();
    };
    BillComponent.prototype.goToLegislator = function (bioguide_id) {
        this.router.navigate(['/legislator', bioguide_id]);
    };
    BillComponent.prototype.goBack = function () {
        this.location.back();
    };
    return BillComponent;
}());
BillComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-bill',
        templateUrl: '../views/bill.component.html',
        styleUrls: ['../styles/bill.component.css']
    }),
    __metadata("design:paramtypes", [bill_service_1.BillService,
        vote_service_1.VoteService,
        router_2.ActivatedRoute,
        common_1.Location,
        router_1.Router])
], BillComponent);
exports.BillComponent = BillComponent;
//# sourceMappingURL=bill.component.js.map