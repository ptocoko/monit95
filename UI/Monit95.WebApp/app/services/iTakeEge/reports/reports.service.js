"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
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
        return this.http.get("".concat(this.endpoint, "/extend/").concat(participTestId));
    };
    ReportsService.prototype.getReportsInfo = function (projectId) {
        return this.http.get("".concat(this.endpoint, "/info/").concat(projectId));
    };
    ReportsService.prototype.getReportsList = function (search) {
        return this.http.get("".concat(this.endpoint), { params: search })
            .pipe((0, map_1.map)(function (reports) {
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
        (0, core_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], ReportsService);
    return ReportsService;
}());
exports.ReportsService = ReportsService;
//# sourceMappingURL=reports.service.js.map