"use strict";
var _this = this;
var legislator_component_1 = require('./legislator.component');
var legislator_service_1 = require('./legislator.service');
var welcome_component_1 = require('./welcome.component');
var legislator_1 = require('./legislator');
var test_service_1 = require('./test.service');
describe('Test Suite 1: ', function () {
    beforeEach(function () {
        _this.testService = new test_service_1.TestService();
        _this.legislator = new legislator_1.Legislator();
        _this.legislatorService = new legislator_service_1.LegislatorService(null);
        _this.legislatorComponent = new legislator_component_1.LegislatorComponent(null, null, null, null);
        _this.welcomeComponent = new welcome_component_1.WelcomeComponent(null, null, null);
    });
    it('this.testService defined.', function () {
        expect(_this.testService).toBeDefined();
    });
    it('this.legislator defined.', function () {
        expect(_this.legislator).toBeDefined();
    });
    it('this.testService named \"InjectedService\".', function () {
        expect(_this.testService.name).toBe('InjectedService');
    });
    it('this.legislatorService defined.', function () {
        expect(_this.legislatorService).toBeDefined();
    });
    it('this.legislatorComponent defined.', function () {
        expect(_this.legislatorComponent).toBeDefined();
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
    it('Call handleAnyError() method in legislator service.', function () {
        expect(_this.legislatorService.handleAnyError("error")).not.toBeNull();
    });
    it('Call handleError() method in legislator component.', function () {
        expect(_this.legislatorComponent.setLegPortritUrl("test")).toEqual('https://theunitedstates.io/images/congress/original/test.jpg');
    });
});
//# sourceMappingURL=1st.spec.js.map