"use strict";
var _this = this;
var about_component_1 = require('./about.component');
var app_component_1 = require('./app.component');
var bill_component_1 = require('./bill.component');
var bill_service_1 = require('./bill.service');
var legislator_component_1 = require('./legislator.component');
var legislator_service_1 = require('./legislator.service');
var newsfeed_component_1 = require('./newsfeed.component');
var repaction_service_1 = require('./repaction.service');
var welcome_component_1 = require('./welcome.component');
var bill_1 = require('./bill');
var legislator_1 = require('./legislator');
var repaction_1 = require('./repaction');
var vote_1 = require('./vote');
var test_service_1 = require('./test.service');
describe('Test Suite 1: ', function () {
    beforeEach(function () {
        _this.testService = new test_service_1.TestService();
        _this.aboutComponent = new about_component_1.AboutComponent();
        _this.appComponent = new app_component_1.AppComponent();
        _this.bill = new bill_1.Bill();
        _this.billComponent = new bill_component_1.BillComponent(null, null, null, null);
        _this.billService = new bill_service_1.BillService(null);
        _this.legislator = new legislator_1.Legislator();
        _this.legislatorComponent = new legislator_component_1.LegislatorComponent(null, null, null, null);
        _this.legislatorService = new legislator_service_1.LegislatorService(null);
        _this.newsfeedComponent = new newsfeed_component_1.NewsfeedComponent(null, null, null, null);
        _this.repAction = new repaction_1.RepAction();
        _this.repActionService = new repaction_service_1.RepActionService(null);
        _this.vote = new vote_1.Vote();
        _this.welcomeComponent = new welcome_component_1.WelcomeComponent(null, null, null);
    });
    it('this.testService defined.', function () {
        expect(_this.testService).toBeDefined();
    });
    it('this.testService named \"InjectedService\".', function () {
        expect(_this.testService.name).toBe('InjectedService');
    });
    it('this.aboutComponent defined.', function () {
        expect(_this.aboutComponent).toBeDefined();
    });
    it('this.appComponent defined.', function () {
        expect(_this.appComponent).toBeDefined();
    });
    it('this.appComponent has correct title.', function () {
        expect(_this.appComponent.title).toBe('epresented');
    });
    it('this.bill defined.', function () {
        expect(_this.bill).toBeDefined();
    });
    it('this.billComponent defined.', function () {
        expect(_this.billComponent).toBeDefined();
    });
    it('this.billService defined.', function () {
        expect(_this.billService).toBeDefined();
    });
    it('obtain something from getBillById() if good id is used.', function () {
        var ret = _this.billService.getBillById("hr1614-115");
        expect(ret).not.toBeNull();
    });
    it('this.legislator defined.', function () {
        expect(_this.legislator).toBeDefined();
    });
    it('this.legislatorComponent defined.', function () {
        expect(_this.legislatorComponent).toBeDefined();
    });
    it('this.legislatorService defined.', function () {
        expect(_this.legislatorService).toBeDefined();
    });
    it('this.newsfeedComponent defined.', function () {
        expect(_this.newsfeedComponent).toBeDefined();
    });
    it('this.repAction defined.', function () {
        expect(_this.repAction).toBeDefined();
    });
    it('this.repActionService defined.', function () {
        expect(_this.repActionService).toBeDefined();
    });
    it('this.vote defined.', function () {
        expect(_this.vote).toBeDefined();
    });
    it('this.welcomeComponent defined.', function () {
        expect(_this.welcomeComponent).toBeDefined();
    });
    it('Null latitude passed as argument to isValidLatLong.', function () {
        expect(_this.welcomeComponent.isValidLatLong(null, 90)).toBe(false);
    });
    it('Null longitude passed as argument to isValidLatLong.', function () {
        expect(_this.welcomeComponent.isValidLatLong(45, null)).toBe(false);
    });
    it('Out of range latitude passed as argument to isValidLatLong.', function () {
        expect(_this.welcomeComponent.isValidLatLong(91, 90)).toBe(false);
    });
    it('Out of range longitude passed as argument to isValidLatLong.', function () {
        expect(_this.welcomeComponent.isValidLatLong(45, -190)).toBe(false);
    });
    it('Latitude containing non-number passed as argument to isValidLatLong.', function () {
        expect(_this.welcomeComponent.isValidLatLong('a3', -90)).toBe(false);
    });
    it('Longitude containing non-number passed as argument to isValidLatLong.', function () {
        expect(_this.welcomeComponent.isValidLatLong(-45, '-3b')).toBe(false);
    });
    it('Valid latitude and longitude passed as argument to isValidLatLong.', function () {
        expect(_this.welcomeComponent.isValidLatLong(45, 90)).toBe(true);
    });
    it('Valid latitude and longitude passed as argument to isValidLatLong.', function () {
        expect(_this.welcomeComponent.isValidLatLong(-45, -90)).toBe(true);
    });
    it('Valid zipcode passed as argument to isValidZip.', function () {
        expect(_this.welcomeComponent.isValidZip('53703')).toBe(true);
    });
    it('Null zipcode passed as argument to isValidZip.', function () {
        expect(_this.welcomeComponent.isValidZip(null)).toBe(false);
    });
    it('Zipcode of incorrect type passed as argument to isValidZip.', function () {
        expect(_this.welcomeComponent.isValidZip(53703)).toBe(false);
    });
    it('Zipcode with too few digits passed as argument to isValidZip.', function () {
        expect(_this.welcomeComponent.isValidZip('5373')).toBe(false);
    });
    it('Zipcode with too many digits passed as argument to isValidZip.', function () {
        expect(_this.welcomeComponent.isValidZip('537030')).toBe(false);
    });
    it('Zipcode containing non-number character passed as argument to isValidZip.', function () {
        expect(_this.welcomeComponent.isValidZip('537a3')).toBe(false);
    });
    it('Call handleAnyError() method in legislator service.', function () {
        expect(_this.legislatorService.handleAnyError("error")).not.toBeNull();
    });
    it('Call handleError() method in legislator component.', function () {
        expect(_this.legislatorComponent.setLegPortritUrl("test")).toEqual('https://theunitedstates.io/images/congress/original/test.jpg');
    });
});
//# sourceMappingURL=1st.spec.js.map