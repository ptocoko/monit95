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
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
var ReportsService = /** @class */ (function () {
    function ReportsService(http) {
        this.http = http;
        this.endpoint = 'api/itakeEge/reports';
    }
    ReportsService.prototype.getExtendReport = function (participTestId) {
        return this.http.get(this.endpoint + "/extend/" + participTestId);
    };
    ReportsService.prototype.getReportsInfo = function (projectId) {
        return this.http.get(this.endpoint + "/info/" + projectId);
    };
    ReportsService.prototype.getReportsList = function (search) {
        return this.http.get("" + this.endpoint, { params: search })
            .pipe(map(function (reports) {
            reports.Items.forEach(function (report) {
                switch (report.Grade5) {
                    case 5:
                        report.PassStatus = 'ЗАЧЕТ';
                        break;
                    case 2:
                        report.PassStatus = 'НЕЗАЧЕТ';
                        break;
                    case -1:
                        report.PassStatus = 'ОТСУТСТВОВАЛ';
                        break;
                    default:
                        break;
                }
            });
            return reports;
        }));
    };
    ReportsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], ReportsService);
    return ReportsService;
}());
export { ReportsService };
//# sourceMappingURL=reports.service.js.map