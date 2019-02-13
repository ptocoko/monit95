"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var AREA_COLLECTOR_API = '/api/area-collectors';
var AreaCollectorService = /** @class */ (function () {
    function AreaCollectorService(http) {
        this.http = http;
    }
    AreaCollectorService.prototype.getCollectorState = function (collectorId) {
        return this.http.get(AREA_COLLECTOR_API + ("/" + collectorId));
    };
    AreaCollectorService.prototype.isFinished = function (collectorId, isFinished) {
        return this.http.put(AREA_COLLECTOR_API + ("/" + collectorId), { isFinished: isFinished }, { responseType: 'text' });
    };
    AreaCollectorService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], AreaCollectorService);
    return AreaCollectorService;
}());
exports.AreaCollectorService = AreaCollectorService;
//# sourceMappingURL=area-collector.service.js.map