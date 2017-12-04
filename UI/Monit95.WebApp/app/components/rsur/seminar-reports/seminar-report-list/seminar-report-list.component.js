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
var seminar_report_service_1 = require("../../../../services/seminar-report.service");
var account_service_1 = require("../../../../services/account.service");
var SeminarReportsListComponent = (function () {
    function SeminarReportsListComponent(seminarReportService, accountService) {
        this.seminarReportService = seminarReportService;
        this.accountService = accountService;
        this.reports = new Array();
    }
    SeminarReportsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.seminarReportService.getReportsList().subscribe(function (res) { return _this.reports = res; });
    };
    SeminarReportsListComponent.prototype.deleteReport = function (reportId) {
        var _this = this;
        this.seminarReportService.deleteReport(reportId).subscribe(function () {
            var report = _this.reports.find(function (s) { return s.RsurReportId === reportId; });
            var index = _this.reports.indexOf(report);
            _this.reports.splice(index, 1);
        });
    };
    return SeminarReportsListComponent;
}());
SeminarReportsListComponent = __decorate([
    core_1.Component({
        selector: 'reports-list',
        templateUrl: "./app/components/rsur/seminar-reports/seminar-report-list/seminar-report-list.component.html?v=" + new Date().getTime(),
        styleUrls: ["./app/components/rsur/seminar-reports/seminar-report-list/seminar-report-list.component.css?v=" + new Date().getTime()]
    }),
    __metadata("design:paramtypes", [seminar_report_service_1.SeminarReportService,
        account_service_1.AccountService])
], SeminarReportsListComponent);
exports.SeminarReportsListComponent = SeminarReportsListComponent;
//# sourceMappingURL=seminar-report-list.component.js.map