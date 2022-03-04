"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportListComponent = exports.EXAMNAME_DEFAULT_SELECTION = exports.TESTNAME_DEFAULT_SELECTION = exports.SCHOOLNAME_DEFAULT_SELECTION = void 0;
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
        this.selectedExamCode = exports.EXAMNAME_DEFAULT_SELECTION;
        this.selectionChange$ = new Subject_1.Subject();
        this.clearHook$ = new Subject_1.Subject();
        this.isLoadingReports = true;
        this.reportsLength = 0;
    }
    ReportListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var search$ = (0, fromEvent_1.fromEvent)(this.searchField.nativeElement, 'input')
            .pipe((0, debounceTime_1.debounceTime)(1000));
        this.searchSub$ = search$.subscribe(function () { return _this.paginator.pageIndex = 0; });
        this.reportsSub$ = this.rsurReportService.getReportsInfo()
            .pipe((0, switchMap_1.switchMap)(function (info) {
            _this.reportsInfo = info;
            return (0, merge_1.merge)(_this.paginator.page, search$, _this.selectionChange$, _this.clearHook$);
        }), (0, startWith_1.startWith)([]), (0, switchMap_1.switchMap)(function () {
            _this.isLoadingReports = true;
            return _this.createRequest();
        }), (0, map_1.map)(function (data) {
            _this.isLoadingReports = false;
            _this.reportsLength = data.TotalCount;
            return data.Items;
        }))
            .subscribe(function (reports) { return _this.dataSource.data = reports; });
    };
    ReportListComponent.prototype.createRequest = function () {
        var schoolId = getSchoolIdFromName(this.selectedSchool);
        var testCode = getTestCode(this.selectedTest);
        var examCode = getExamCode(this.selectedExamCode);
        return this.rsurReportService.getReports((this.paginator.pageIndex + 1).toString(), this.paginator.pageSize.toString(), this.searchParticipText, schoolId, testCode, examCode);
    };
    ReportListComponent.prototype.clearFilter = function () {
        this.selectedSchool = exports.SCHOOLNAME_DEFAULT_SELECTION;
        this.selectedTest = exports.TESTNAME_DEFAULT_SELECTION;
        this.selectedExamCode = exports.EXAMNAME_DEFAULT_SELECTION;
        this.searchParticipText = null;
        this.clearHook$.next();
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
    ReportListComponent.prototype.ngOnDestroy = function () {
        this.searchSub$.unsubscribe();
        this.reportsSub$.unsubscribe();
    };
    tslib_1.__decorate([
        (0, core_1.ViewChild)('paginator'),
        tslib_1.__metadata("design:type", material_1.MatPaginator)
    ], ReportListComponent.prototype, "paginator", void 0);
    tslib_1.__decorate([
        (0, core_1.ViewChild)('searchField'),
        tslib_1.__metadata("design:type", core_1.ElementRef)
    ], ReportListComponent.prototype, "searchField", void 0);
    ReportListComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            selector: 'report-list',
            templateUrl: "./app/components/rsur/reports/report-list/report-list.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/components/rsur/reports/report-list/report-list.component.css?v=".concat(new Date().getTime())]
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
function getExamCode(selectedExamCode) {
    return selectedExamCode && selectedExamCode !== exports.EXAMNAME_DEFAULT_SELECTION ? selectedExamCode : null;
}
function getTestCode(selectedTestCode) {
    return selectedTestCode && selectedTestCode !== exports.TESTNAME_DEFAULT_SELECTION ? selectedTestCode : null;
}
//# sourceMappingURL=report-list.component.js.map