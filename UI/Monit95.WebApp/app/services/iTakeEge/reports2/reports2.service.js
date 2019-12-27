"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var Reports2Service = /** @class */ (function () {
    function Reports2Service(http) {
        this.http = http;
        this.endpoint = 'api/itakeEge/reports2';
    }
    Reports2Service.prototype.getSchoolsReports = function (projectTestId) {
        return this.http.get(this.endpoint + '/schools', { params: { 'projectTestId': projectTestId.toString() } });
    };
    Reports2Service = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], Reports2Service);
    return Reports2Service;
}());
exports.Reports2Service = Reports2Service;
//# sourceMappingURL=reports2.service.js.map