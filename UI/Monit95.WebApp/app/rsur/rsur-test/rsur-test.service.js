"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var RsurTestService = /** @class */ (function () {
    function RsurTestService(http) {
        this.http = http;
        this.ROUTE_PREFIX = 'api/RsurTests';
    }
    RsurTestService.prototype.getProtocolStatus = function () {
        return this.http.get(this.ROUTE_PREFIX + "/Statistics");
    };
    RsurTestService.prototype.getTestName = function (rsurTestId) {
        return this.http.get(this.ROUTE_PREFIX + "/" + rsurTestId + "/Name");
    };
    RsurTestService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.Http])
    ], RsurTestService);
    return RsurTestService;
}());
exports.RsurTestService = RsurTestService;
//# sourceMappingURL=rsur-test.service.js.map