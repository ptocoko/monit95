"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ActualizationService = /** @class */ (function () {
    function ActualizationService(http) {
        this.http = http;
        this.endpoint = 'api/collectors';
        this.collectorId = 2;
        this.status = true;
    }
    ActualizationService.prototype.getActualizeStatus = function () {
        return this.http.get(this.endpoint + "/" + this.collectorId);
        //return of(this.status);
    };
    ActualizationService.prototype.endActualization = function () {
        return this.http.put(this.endpoint + "/" + this.collectorId, { 'IsFinished': true }, { responseType: 'text' });
        //this.status = false;
        //return of(this.status);
    };
    ActualizationService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], ActualizationService);
    return ActualizationService;
}());
exports.ActualizationService = ActualizationService;
//# sourceMappingURL=actualization.service.js.map