"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var about_component_1 = require("./about.component");
var bill_component_1 = require("./bill.component");
var house_component_1 = require("./house.component");
var legislator_component_1 = require("./legislator.component");
var newsfeed_component_1 = require("./newsfeed.component");
var senate_component_1 = require("./senate.component");
var welcome_component_1 = require("./welcome.component");
var routes = [
    { path: '', redirectTo: '/newsfeed', pathMatch: 'full' },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'bill/:bill_id', component: bill_component_1.BillComponent },
    { path: 'house', component: house_component_1.HouseComponent },
    { path: 'legislator/:bioguide_id', component: legislator_component_1.LegislatorComponent },
    { path: 'newsfeed', component: newsfeed_component_1.NewsfeedComponent },
    { path: 'senate', component: senate_component_1.SenateComponent },
    { path: 'welcome', component: welcome_component_1.WelcomeComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map