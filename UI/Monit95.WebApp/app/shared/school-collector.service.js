"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var SCHOOL_COLLECTOR_API = '/api/school-collectors';
var SchoolCollectorService = /** @class */ (function () {
    function SchoolCollectorService(http) {
        this.http = http;
    }
    SchoolCollectorService.prototype.getCollectorState = function (collectorId) {
        return this.http.get(SCHOOL_COLLECTOR_API + ("/" + collectorId));
    };
    SchoolCollectorService.prototype.isFinished = function (collectorId, isFinished) {
        return this.http.put(SCHOOL_COLLECTOR_API + ("/" + collectorId), { isFinished: isFinished }, { responseType: 'text' });
    };
    SchoolCollectorService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], SchoolCollectorService);
    return SchoolCollectorService;
}());
exports.SchoolCollectorService = SchoolCollectorService;
//# sourceMappingURL=school-collector.service.js.map