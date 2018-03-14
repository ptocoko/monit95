"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var SchoolFileService = /** @class */ (function () {
    function SchoolFileService(http) {
        this.http = http;
        this.ROUTE_PREFIX = 'api/schoolFiles';
    }
    SchoolFileService.prototype.getFiles = function () {
        return this.http.get("" + this.ROUTE_PREFIX);
    };
    SchoolFileService.prototype.checkReportIsGot = function (reportId) {
        return this.http.get(this.ROUTE_PREFIX + "/isGot/" + reportId);
    };
    SchoolFileService.prototype.setReportIsGot = function (reportId) {
        return this.http.post(this.ROUTE_PREFIX + "/isGot/" + reportId, null, { responseType: 'text' });
    };
    SchoolFileService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], SchoolFileService);
    return SchoolFileService;
}());
exports.SchoolFileService = SchoolFileService;
//# sourceMappingURL=school-file.service.js.map