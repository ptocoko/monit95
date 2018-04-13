"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var rsur_report_service_1 = require("../../../../services/rsur-report.service");
var account_service_1 = require("../../../../services/account.service");
var material_1 = require("@angular/material");
var merge_1 = require("rxjs/observable/merge");
var fromEvent_1 = require("rxjs/observable/fromEvent");
var debounceTime_1 = require("rxjs/operators/debounceTime");
var map_1 = require("rxjs/operators/map");
var startWith_1 = require("rxjs/operators/startWith");
var switchMap_1 = require("rxjs/operators/switchMap");
var Subject_1 = require("rxjs/Subject");
exports.SCHOOLNAME_DEFAULT_SELECTION = 'все организации';
exports.TESTNAME_DEFAULT_SELECTION = 'все блоки';
exports.EXAMNAME_DEFAULT_SELECTION = 'все диагностики';
var ReportListComponent = /** @class */ (function () {
    function ReportListComponent(rsurReportService, route, accountService) {
        this.rsurReportService = rsurReportService;
        this.route = route;
        this.accountService = accountService;
        this.reportsInfo = {};
        this.displayedColumns = ['number', 'code', 'surname', 'name', 'secondName', 'schoolName', 'examName', 'testStatus'];
        this.dataSource = new material_1.MatTableDataSource();
        this.selectedSchool = exports.SCHOOLNAME_DEFAULT_SELECTION;
        this.selectedTest = exports.TESTNAME_DEFAULT_SELECTION;
        this.selectedExam = exports.EXAMNAME_DEFAULT_SELECTION;
        this.selectionChange$ = new Subject_1.Subject();
        this.isLoadingReports = true;
        this.reportsLength = 0;
    }
    ReportListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.rsurReportService.getReportsInfo().subscribe(function (info) {
            _this.reportsInfo = info;
            var search$ = fromEvent_1.fromEvent(_this.searchField.nativeElement, 'input')
                .pipe(debounceTime_1.debounceTime(1000));
            search$.subscribe(function () { return _this.paginator.pageIndex = 0; });
            merge_1.merge(_this.paginator.page, search$, _this.selectionChange$)
                .pipe(startWith_1.startWith([]), switchMap_1.switchMap(function () {
                _this.isLoadingReports = true;
                return _this.createRequest();
            }), map_1.map(function (data) {
                _this.isLoadingReports = false;
                _this.reportsLength = data.TotalCount;
                return data.Items;
            })).subscribe(function (reports) { return _this.dataSource.data = reports; });
        });
    };
    ReportListComponent.prototype.createRequest = function () {
        var schoolId = getSchoolIdFromName(this.selectedSchool);
        var testCode = getTestCodeFromName(this.selectedTest);
        var examName = getExamName(this.selectedExam);
        return this.rsurReportService.getReports((this.paginator.pageIndex + 1).toString(), this.paginator.pageSize.toString(), this.searchParticipText, schoolId, testCode, examName);
    };
    ReportListComponent.prototype.selectionChange = function () {
        this.paginator.pageIndex = 0;
        this.selectionChange$.next(1);
    };
    ReportListComponent.prototype.openReport = function (report) {
        if (report.TestStatus.toLowerCase() !== 'отсутствовал' && report.ExamName.toLowerCase() !== 'апрель-2017') {
            this.route.navigate(['/rsur/report', report.RsurParticipTestId]);
        }
    };
    tslib_1.__decorate([
        core_1.ViewChild('paginator'),
        tslib_1.__metadata("design:type", material_1.MatPaginator)
    ], ReportListComponent.prototype, "paginator", void 0);
    tslib_1.__decorate([
        core_1.ViewChild('searchField'),
        tslib_1.__metadata("design:type", core_1.ElementRef)
    ], ReportListComponent.prototype, "searchField", void 0);
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
function getSchoolIdFromName(selectedSchoolName) {
    if (selectedSchoolName && selectedSchoolName !== exports.SCHOOLNAME_DEFAULT_SELECTION) {
        return selectedSchoolName.split('-')[0].trim();
    }
    return null;
}
function getTestCodeFromName(selectedTestName) {
    if (selectedTestName && selectedTestName !== exports.TESTNAME_DEFAULT_SELECTION) {
        return selectedTestName.split('-')[0].trim();
    }
    return null;
}
function getExamName(selectedExamName) {
    return selectedExamName && selectedExamName !== exports.EXAMNAME_DEFAULT_SELECTION ? selectedExamName : null;
}
//# sourceMappingURL=report-list.component.js.map