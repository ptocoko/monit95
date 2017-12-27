"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var RsurReportService = /** @class */ (function () {
    function RsurReportService(http) {
        this.http = http;
        this.ROUTE_PREFIX = 'api/rsur/participReports';
    }
    RsurReportService.prototype.getReports = function () {
        return this.http.get("" + this.ROUTE_PREFIX);
    };
    RsurReportService.prototype.getReport = function (rsurParticipTestId) {
        return this.http.get(this.ROUTE_PREFIX + "/" + rsurParticipTestId);
    };
    RsurReportService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], RsurReportService);
    return RsurReportService;
}());
exports.RsurReportService = RsurReportService;
//# sourceMappingURL=rsur-report.service.js.map