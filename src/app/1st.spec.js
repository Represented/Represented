"use strict";
var _this = this;
var legislator_service_1 = require('./legislator.service');
var legislator_1 = require('./legislator');
var test_service_1 = require('./test.service');
describe('Test Suite A: ', function () {
    beforeEach(function () {
        _this.testService = new test_service_1.TestService();
        _this.legislator = new legislator_1.Legislator();
        _this.legislatorService = new legislator_service_1.LegislatorService(null);
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
    it('this.legislatorService not null.', function () {
        expect(_this.legislatorService).not.toBeNull();
    });
    it('Call test method in legislator service.', function () {
        expect(_this.legislatorService.test()).toEqual(0);
    });
    it('Get legislator by id from legislator service.', function () {
        expect(_this.legislatorService.getLegislatorById('B001230')).not.toBeNull();
    });
});
//# sourceMappingURL=1st.spec.js.map