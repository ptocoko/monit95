"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var SCHOOL_COLLECTOR_API = '/api/collectors';
var SchoolCollector = /** @class */ (function () {
    function SchoolCollector(CollectorId, IsFinished) {
        this.CollectorId = CollectorId;
        this.IsFinished = IsFinished;
    }
    return SchoolCollector;
}());
exports.SchoolCollector = SchoolCollector;
var SchoolCollectorService = /** @class */ (function () {
    function SchoolCollectorService(http) {
        this.http = http;
    }
    SchoolCollectorService.prototype.getSchoolCollectorState = function (collectorId) {
        return this.http.get(SCHOOL_COLLECTOR_API + ("/" + collectorId)).map(function (response) {
            return response.json().IsFinished;
        });
    };
    SchoolCollectorService.prototype.isFinished = function (collectorId, isFinished) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(SCHOOL_COLLECTOR_API + ("/" + collectorId), { 'IsFinished': isFinished }, options);
    };
    SchoolCollectorService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.Http])
    ], SchoolCollectorService);
    return SchoolCollectorService;
}());
exports.SchoolCollectorService = SchoolCollectorService;
//# sourceMappingURL=school-collector.service.js.map