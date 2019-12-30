var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { merge, fromEvent, Subject } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { ReportsService } from '../../../services/iTakeEge/reports/reports.service';
import { AccountService } from '../../../services/account.service';
var ReportsListComponent = /** @class */ (function () {
    function ReportsListComponent(rsurReportService, route, router, accountService) {
        this.rsurReportService = rsurReportService;
        this.route = route;
        this.router = router;
        this.accountService = accountService;
        this.reportsInfo = {};
        this.schoolId = '';
        this.testCode = '';
        this.displayedColumns = ['number', 'surname', 'name', 'secondName', 'testName', 'passStatus'];
        this.dataSource = new MatTableDataSource();
        this.selectionChange$ = new Subject();
        this.isLoadingReports = true;
        this.reportsLength = 0;
    }
    ReportsListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.routeSubs = this.router.paramMap.subscribe(function (params) {
            _this.projectId = Number.parseInt(params.get('projectId'), 10);
            var projectName = _this.router.snapshot.queryParams['projectName'];
            if (projectName) {
                setTimeout(function () { return _this.projectName = projectName; }, 0);
            }
            _this.rsurReportService.getReportsInfo(_this.projectId).subscribe(function (info) {
                _this.reportsInfo = info;
                var schoolId = _this.router.snapshot.queryParamMap.get('schoolId');
                var testCode = _this.router.snapshot.queryParamMap.get('testCode');
                if (schoolId) {
                    _this.schoolId = schoolId;
                }
                if (testCode) {
                    _this.testCode = testCode;
                }
                var search$ = fromEvent(_this.searchField.nativeElement, 'input')
                    .pipe(debounceTime(1000));
                search$.subscribe(function () { return _this.paginator.pageIndex = 0; });
                merge(_this.paginator.page, search$, _this.selectionChange$)
                    .pipe(startWith([]), switchMap(function () {
                    _this.isLoadingReports = true;
                    return _this.createRequest();
                }), map(function (data) {
                    _this.isLoadingReports = false;
                    _this.reportsLength = data.TotalCount;
                    return data.Items;
                })).subscribe(function (reports) { return _this.dataSource.data = reports; });
            });
        });
    };
    ReportsListComponent.prototype.createRequest = function () {
        return this.rsurReportService.getReportsList(__assign({}, this.schoolId && this.accountService.isArea() ? { schoolId: this.schoolId } : {}, this.testCode ? { testCode: this.testCode } : {}, this.searchParticipText ? { searchParticipText: this.searchParticipText } : {}, { projectId: this.projectId.toString(), page: (this.paginator.pageIndex + 1).toString(), pageSize: this.paginator.pageSize.toString() }));
    };
    ReportsListComponent.prototype.selectionChange = function () {
        this.paginator.pageIndex = 0;
        this.selectionChange$.next(1);
    };
    ReportsListComponent.prototype.getRowStylingObject = function (report) {
        return {
            'isClickable': report.Grade5 > 0,
            'absent-row': report.Grade5 === -1,
            'test-failed-row': report.Grade5 === 2,
            'test-pass-row': report.Grade5 === 5
        };
    };
    ReportsListComponent.prototype.openReport = function (report) {
        if (report.Grade5 > 0) {
            this.route.navigate(['/particips/report', report.ParticipTestId]);
        }
    };
    ReportsListComponent.prototype.clearSearchText = function () {
        this.searchParticipText = '';
        this.paginator.pageIndex = 0;
        this.selectionChange$.next(1);
    };
    ReportsListComponent.prototype.ngOnDestroy = function () {
        if (this.routeSubs)
            this.routeSubs.unsubscribe();
    };
    __decorate([
        ViewChild('paginator'),
        __metadata("design:type", MatPaginator)
    ], ReportsListComponent.prototype, "paginator", void 0);
    __decorate([
        ViewChild('searchField'),
        __metadata("design:type", ElementRef)
    ], ReportsListComponent.prototype, "searchField", void 0);
    ReportsListComponent = __decorate([
        Component({
            templateUrl: './list.component.html',
            styleUrls: ['./list.component.css']
        }),
        __metadata("design:paramtypes", [ReportsService,
            Router,
            ActivatedRoute,
            AccountService])
    ], ReportsListComponent);
    return ReportsListComponent;
}());
export { ReportsListComponent };
//# sourceMappingURL=list.component.js.map