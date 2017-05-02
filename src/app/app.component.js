"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'epresented';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        template: "\n    <h1>\n      <img src=\"../img/represented_logo_3.png\" height=\"50\" width=\"40\" routerLink=\"/newsfeed\" routerLinkActive=\"active\">{{title}}\n      <img src=\"../img/Info.png\" height=\"40\" width=\"40\" align=\"right\" routerLink=\"/about\" routerLinkActive=\"active\">\n    </h1>\n    <nav>\n      <a routerLink=\"/newsfeed\"   routerLinkActive=\"active\">My Reps</a>\n      <a routerLink=\"/house\"   routerLinkActive=\"inactive\">House</a>\n      <a routerLink=\"/senate\"   routerLinkActive=\"inactive\">Senate</a>\n      <a routerLink=\"/about\"      routerLinkActive=\"active\">About</a>\n      <a routerLink=\"/welcome\"    routerLinkActive=\"active\">Welcome</a>\n      <!--<a routerLink=\"/legislator\" routerLinkActive=\"active\">Legislator</a>-->\n      <!--<a routerLink=\"/bill\"       routerLinkActive=\"active\">Bill</a>-->\n    </nav>\n    <router-outlet></router-outlet>\n  ",
        styleUrls: ['../styles/app.component.css']
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map