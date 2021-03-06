"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeminarReportsListComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var seminar_report_service_1 = require("../../../../services/seminar-report.service");
var account_service_1 = require("../../../../services/account.service");
require("rxjs/add/operator/startWith");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var material_1 = require("@angular/material");
var Subject_1 = require("rxjs/Subject");
var SeminarReportsListComponent = /** @class */ (function () {
    function SeminarReportsListComponent(seminarReportService, accountService, snackBar) {
        this.seminarReportService = seminarReportService;
        this.accountService = accountService;
        this.snackBar = snackBar;
        this.isLoading = true;
        //reportsLoading: boolean = false;
        this.deleted$ = new Subject_1.Subject();
    }
    SeminarReportsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.deleted$
            .startWith({ 'hello': 'there', 'Obi-Wan': 'Kenobi' })
            .switchMap(function () {
            _this.isLoading = true;
            return _this.seminarReportService.getReportsList();
        })
            .map(function (reports) {
            _this.isLoading = false;
            _this.reportsLength = reports.length;
            return reports;
        }).
            subscribe(function (reports) { return _this.reports = reports; });
    };
    SeminarReportsListComponent.prototype.deleteReport = function (reportId) {
        var _this = this;
        this.seminarReportService.deleteReport(reportId).subscribe(function (response) {
            _this.deleted$.next('deleted');
            _this.snackBar.open('отчет удален', 'OK', { duration: 3000 });
        });
    };
    SeminarReportsListComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            selector: 'reports-list',
            templateUrl: "./app/components/rsur/seminar-reports/seminar-report-list/seminar-report-list.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/components/rsur/seminar-reports/seminar-report-list/seminar-report-list.component.css?v=".concat(new Date().getTime())]
        }),
        tslib_1.__metadata("design:paramtypes", [seminar_report_service_1.SeminarReportService,
            account_service_1.AccountService,
            material_1.MatSnackBar])
    ], SeminarReportsListComponent);
    return SeminarReportsListComponent;
}());
exports.SeminarReportsListComponent = SeminarReportsListComponent;
//# sourceMappingURL=seminar-report-list.component.js.map