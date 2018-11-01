"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ReportsService = /** @class */ (function () {
    function ReportsService(http) {
        this.http = http;
        this.endpoint = 'api/itakeEge/reports';
    }
    ReportsService.prototype.getExtendReport = function (participTestId) {
        return this.http.get(this.endpoint + "/" + participTestId);
    };
    ReportsService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], ReportsService);
    return ReportsService;
}());
exports.ReportsService = ReportsService;
//# sourceMappingURL=reports.service.js.map