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
import { HttpClient, HttpParams } from '@angular/common/http';
var RsurReportService = /** @class */ (function () {
    function RsurReportService(http) {
        this.http = http;
        this.ROUTE_PREFIX = 'api/rsur/participReports';
    }
    RsurReportService.prototype.getReports = function (page, length, search, schoolId, testCode, examCode) {
        var params = new HttpParams();
        if (page)
            params = params.append('page', page);
        if (length)
            params = params.append('length', length);
        if (search)
            params = params.append('search', search);
        if (schoolId)
            params = params.append('schoolId', schoolId);
        if (testCode)
            params = params.append('testCode', testCode);
        if (examCode)
            params = params.append('examCode', examCode);
        return this.http.get("" + this.ROUTE_PREFIX, { params: params });
    };
    RsurReportService.prototype.getReportsInfo = function () {
        return this.http.get(this.ROUTE_PREFIX + "/info");
    };
    RsurReportService.prototype.getReport = function (rsurParticipTestId) {
        return this.http.get(this.ROUTE_PREFIX + "/" + rsurParticipTestId);
    };
    RsurReportService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], RsurReportService);
    return RsurReportService;
}());
export { RsurReportService };
//# sourceMappingURL=rsur-report.service.js.map