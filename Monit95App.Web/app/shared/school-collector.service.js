"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var SCHOOL_COLLECTOR_API = '/api/collectors';
var SchoolCollector = (function () {
    function SchoolCollector(CollectorId, IsFinished) {
        this.CollectorId = CollectorId;
        this.IsFinished = IsFinished;
    }
    return SchoolCollector;
}());
exports.SchoolCollector = SchoolCollector;
var SchoolCollectorService = (function () {
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
    return SchoolCollectorService;
}());
SchoolCollectorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], SchoolCollectorService);
exports.SchoolCollectorService = SchoolCollectorService;
var _a;
//# sourceMappingURL=school-collector.service.js.map