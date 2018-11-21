"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var map_1 = require("rxjs/operators/map");
var ReportsService = /** @class */ (function () {
    function ReportsService(http) {
        this.http = http;
        this.endpoint = 'api/itakeEge/reports';
    }
    ReportsService.prototype.getExtendReport = function (participTestId) {
        return this.http.get(this.endpoint + "/extend/" + participTestId);
    };
    ReportsService.prototype.getReportsInfo = function (projectId) {
        return this.http.get(this.endpoint + "/info/" + projectId);
    };
    ReportsService.prototype.getReportsList = function (search) {
        return this.http.get("" + this.endpoint, { params: search })
            .pipe(map_1.map(function (reports) {
            reports.Items.forEach(function (report) {
                switch (report.Grade5) {
                    case 5:
                        report.PassStatus = 'ЗАЧЕТ';
                        break;
                    case 2:
                        report.PassStatus = 'НЕЗАЧЕТ';
                        break;
                    case -1:
                        report.PassStatus = 'ОТСУТСТВОВАЛ';
                        break;
                    default:
                        break;
                }
            });
            return reports;
        }));
    };
    ReportsService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], ReportsService);
    return ReportsService;
}());
exports.ReportsService = ReportsService;
//# sourceMappingURL=reports.service.js.map