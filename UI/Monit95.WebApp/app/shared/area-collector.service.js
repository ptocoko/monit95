var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
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
    AreaCollectorService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], AreaCollectorService);
    return AreaCollectorService;
}());
export { AreaCollectorService };
//# sourceMappingURL=area-collector.service.js.map