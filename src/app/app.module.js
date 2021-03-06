"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
var primeng_1 = require("primeng/primeng");
var app_routing_module_1 = require("./app-routing.module");
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
var about_component_1 = require("./about.component");
var app_component_1 = require("./app.component");
var bill_component_1 = require("./bill.component");
var bill_service_1 = require("./bill.service");
var vote_service_1 = require("./vote.service");
var primeng_2 = require("primeng/primeng");
var house_component_1 = require("./house.component");
var legislator_component_1 = require("./legislator.component");
var legislator_service_1 = require("./legislator.service");
var newsfeed_component_1 = require("./newsfeed.component");
var senate_component_1 = require("./senate.component");
var welcome_component_1 = require("./welcome.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            forms_2.ReactiveFormsModule,
            http_1.HttpModule,
            http_2.JsonpModule,
            app_routing_module_1.AppRoutingModule,
            primeng_2.DataScrollerModule,
            primeng_1.ChartModule
        ],
        declarations: [
            about_component_1.AboutComponent,
            app_component_1.AppComponent,
            bill_component_1.BillComponent,
            house_component_1.HouseComponent,
            legislator_component_1.LegislatorComponent,
            newsfeed_component_1.NewsfeedComponent,
            senate_component_1.SenateComponent,
            welcome_component_1.WelcomeComponent
        ],
        providers: [
            bill_service_1.BillService,
            legislator_service_1.LegislatorService,
            cookies_service_1.CookieService,
            vote_service_1.VoteService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map