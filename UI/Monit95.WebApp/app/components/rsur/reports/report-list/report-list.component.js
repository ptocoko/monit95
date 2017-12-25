"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var rsur_report_service_1 = require("../../../../services/rsur-report.service");
var account_service_1 = require("../../../../services/account.service");
var TEST_DATE = '2017-10-11';
var ReportListComponent = /** @class */ (function () {
    function ReportListComponent(rsurReportService, route, accountService) {
        this.rsurReportService = rsurReportService;
        this.route = route;
        this.accountService = accountService;
    }
    ReportListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var schoolFromStorage = localStorage.getItem('selectedSchool');
        this.selectedSchool = schoolFromStorage ? schoolFromStorage : 'Все организации';
        var testFromStorage = localStorage.getItem('selectedTest');
        this.selectedTest = testFromStorage ? testFromStorage : 'Все блоки';
        var examFromStorage = localStorage.getItem('selectedExam');
        this.selectedExam = examFromStorage ? examFromStorage : 'Все диагностики';
        this.isLoading = true;
        this.rsurReportService.getReports().subscribe(function (reports) {
            _this.reportsList = reports;
            _this.isLoading = false;
        });
    };
    ReportListComponent.prototype.openReport = function (rsurParticipTestId) {
        localStorage.setItem('selectedSchool', this.selectedSchool);
        localStorage.setItem('selectedTest', this.selectedTest);
        localStorage.setItem('selectedExam', this.selectedExam);
        this.route.navigate(['/rsur/report', rsurParticipTestId]);
    };
    ReportListComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'report-list',
            templateUrl: "./app/components/rsur/reports/report-list/report-list.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/rsur/reports/report-list/report-list.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [rsur_report_service_1.RsurReportService,
            router_1.Router,
            account_service_1.AccountService])
    ], ReportListComponent);
    return ReportListComponent;
}());
exports.ReportListComponent = ReportListComponent;
//# sourceMappingURL=report-list.component.js.map