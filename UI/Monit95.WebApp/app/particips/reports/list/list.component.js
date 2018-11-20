"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var merge_1 = require("rxjs/observable/merge");
var fromEvent_1 = require("rxjs/observable/fromEvent");
var debounceTime_1 = require("rxjs/operators/debounceTime");
var map_1 = require("rxjs/operators/map");
var startWith_1 = require("rxjs/operators/startWith");
var switchMap_1 = require("rxjs/operators/switchMap");
var Subject_1 = require("rxjs/Subject");
var reports_service_1 = require("../../../services/iTakeEge/reports/reports.service");
var account_service_1 = require("../../../services/account.service");
var ReportsListComponent = /** @class */ (function () {
    function ReportsListComponent(rsurReportService, route, router, accountService) {
        this.rsurReportService = rsurReportService;
        this.route = route;
        this.router = router;
        this.accountService = accountService;
        this.reportsInfo = {};
        this.testCode = '';
        this.displayedColumns = ['number', 'surname', 'name', 'secondName', 'testName', 'passStatus'];
        this.dataSource = new material_1.MatTableDataSource();
        this.selectionChange$ = new Subject_1.Subject();
        this.isLoadingReports = true;
        this.reportsLength = 0;
    }
    ReportsListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.projectId = this.router.snapshot.params['projectId'];
        this.rsurReportService.getReportsInfo(this.projectId).subscribe(function (info) {
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
    ReportsListComponent.prototype.createRequest = function () {
        return this.rsurReportService.getReportsList(tslib_1.__assign({}, this.testCode ? { testCode: this.testCode } : {}, this.searchParticipText ? { searchParticipText: this.searchParticipText } : {}, { projectId: this.projectId.toString(), page: (this.paginator.pageIndex + 1).toString(), pageSize: this.paginator.pageSize.toString() }));
    };
    ReportsListComponent.prototype.selectionChange = function () {
        this.paginator.pageIndex = 0;
        this.selectionChange$.next(1);
    };
    ReportsListComponent.prototype.getRowStylingObject = function (report) {
        return {
            'isClickable': report.PassStatus.toLowerCase() !== 'отсутствовал',
            'absent-row': report.PassStatus.toLowerCase() === 'отсутствовал',
            'test-failed-row': report.PassStatus.toLowerCase() === 'незачет',
            'test-pass-row': report.PassStatus.toLowerCase() === 'зачет'
        };
    };
    ReportsListComponent.prototype.openReport = function (report) {
        if (report.PassStatus.toLowerCase() !== 'отсутствовал') {
            this.route.navigate(['/particips/report', report.ParticipTestId]);
        }
    };
    tslib_1.__decorate([
        core_1.ViewChild('paginator'),
        tslib_1.__metadata("design:type", material_1.MatPaginator)
    ], ReportsListComponent.prototype, "paginator", void 0);
    tslib_1.__decorate([
        core_1.ViewChild('searchField'),
        tslib_1.__metadata("design:type", core_1.ElementRef)
    ], ReportsListComponent.prototype, "searchField", void 0);
    ReportsListComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/particips/reports/list/list.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/particips/reports/list/list.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [reports_service_1.ReportsService,
            router_1.Router,
            router_1.ActivatedRoute,
            account_service_1.AccountService])
    ], ReportsListComponent);
    return ReportsListComponent;
}());
exports.ReportsListComponent = ReportsListComponent;
//# sourceMappingURL=list.component.js.map