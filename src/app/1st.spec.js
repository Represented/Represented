"use strict";
var _this = this;
var legislator_service_1 = require('./legislator.service');
var test_service_1 = require('./test.service');
describe('1st tests', function () {
    beforeEach(function () {
        _this.testService = new test_service_1.TestService();
    });
    it('Hello, I\'m a test!', function () {
        expect(true).toBe(true);
    });
    it('This will succeed. Unlike Charlie.', function () {
        expect(_this.testService).toBeDefined();
    });
    it('This will succeed. Unlike Charlie.', function () {
        expect(_this.testService.name).toBe('InjectedService');
    });
    it('This will fail. Just like Charlie.', inject([legislator_service_1.LegislatorService], function (legislatorService) {
        expect(_this.legislatorService).toBeDefined();
    }));
    it('This will fail. Just like Charlie.', inject([legislator_service_1.LegislatorService], function (legislatorService) {
        expect(_this.legislatorService.getLegislatorById('B001230')).not.toBeNull();
    }));
});
//# sourceMappingURL=1st.spec.js.map