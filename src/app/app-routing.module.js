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
var about_component_1 = require('./about.component');
var bill_component_1 = require('./bill.component');
var legislator_component_1 = require('./legislator.component');
var newsfeed_component_1 = require('./newsfeed.component');
var welcome_component_1 = require('./welcome.component');
var routes = [
    { path: '', redirectTo: '/newsfeed', pathMatch: 'full' },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'bill/:bill_id', component: bill_component_1.BillComponent },
    { path: 'legislator', component: legislator_component_1.LegislatorComponent },
    { path: 'newsfeed', component: newsfeed_component_1.NewsfeedComponent },
    { path: 'welcome', component: welcome_component_1.WelcomeComponent },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map