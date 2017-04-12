"use strict";
var _this = this;
var test_service_1 = require('./test.service');
describe('1st tests', function () {
    beforeEach(function () {
        _this.testService = new test_service_1.TestService();
        //this.legislatorService = new LegislatorService();
    });
    it('Hello, I\'m a test!', function () { return expect(true).toBe(true); });
    it('Hello, this will fail. Just like Charlie.', function () { return expect(_this.testService.name).toBe('InjectedService'); });
    xit('Hello, this will fail. Just like Charlie.', function () { return expect(_this.legislatorService).not.toBeNull(); });
});
//# sourceMappingURL=1st.spec.js.map