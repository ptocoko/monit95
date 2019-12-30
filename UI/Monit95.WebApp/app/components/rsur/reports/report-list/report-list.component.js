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
import { Router } from '@angular/router';
import { RsurReportService } from '../../../../services/rsur-report.service';
import { AccountService } from '../../../../services/account.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { merge, fromEvent, Subject } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';
export var SCHOOLNAME_DEFAULT_SELECTION = 'все организации';
export var TESTNAME_DEFAULT_SELECTION = 'все блоки';
export var EXAMNAME_DEFAULT_SELECTION = 'все диагностики';
var ReportListComponent = /** @class */ (function () {
    function ReportListComponent(rsurReportService, route, accountService) {
        this.rsurReportService = rsurReportService;
        this.route = route;
        this.accountService = accountService;
        this.reportsInfo = {};
        this.displayedColumns = ['number', 'code', 'surname', 'name', 'secondName', 'schoolName', 'examName', 'testStatus'];
        this.dataSource = new MatTableDataSource();
        this.selectedSchool = SCHOOLNAME_DEFAULT_SELECTION;
        this.selectedTest = TESTNAME_DEFAULT_SELECTION;
        this.selectedExamCode = EXAMNAME_DEFAULT_SELECTION;
        this.selectionChange$ = new Subject();
        this.clearHook$ = new Subject();
        this.isLoadingReports = true;
        this.reportsLength = 0;
    }
    ReportListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var search$ = fromEvent(this.searchField.nativeElement, 'input')
            .pipe(debounceTime(1000));
        this.searchSub$ = search$.subscribe(function () { return _this.paginator.pageIndex = 0; });
        this.reportsSub$ = this.rsurReportService.getReportsInfo()
            .pipe(switchMap(function (info) {
            _this.reportsInfo = info;
            return merge(_this.paginator.page, search$, _this.selectionChange$, _this.clearHook$);
        }), startWith([]), switchMap(function () {
            _this.isLoadingReports = true;
            return _this.createRequest();
        }), map(function (data) {
            _this.isLoadingReports = false;
            _this.reportsLength = data.TotalCount;
            return data.Items;
        }))
            .subscribe(function (reports) { return _this.dataSource.data = reports; });
    };
    ReportListComponent.prototype.createRequest = function () {
        var schoolId = getSchoolIdFromName(this.selectedSchool);
        var testCode = getTestCodeFromName(this.selectedTest);
        var examCode = getExamCode(this.selectedExamCode);
        return this.rsurReportService.getReports((this.paginator.pageIndex + 1).toString(), this.paginator.pageSize.toString(), this.searchParticipText, schoolId, testCode, examCode);
    };
    ReportListComponent.prototype.clearFilter = function () {
        this.selectedSchool = SCHOOLNAME_DEFAULT_SELECTION;
        this.selectedTest = TESTNAME_DEFAULT_SELECTION;
        this.selectedExamCode = EXAMNAME_DEFAULT_SELECTION;
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
    __decorate([
        ViewChild('paginator'),
        __metadata("design:type", MatPaginator)
    ], ReportListComponent.prototype, "paginator", void 0);
    __decorate([
        ViewChild('searchField'),
        __metadata("design:type", ElementRef)
    ], ReportListComponent.prototype, "searchField", void 0);
    ReportListComponent = __decorate([
        Component({
            selector: 'report-list',
            templateUrl: './report-list.component.html',
            styleUrls: ['./report-list.component.css']
        }),
        __metadata("design:paramtypes", [RsurReportService,
            Router,
            AccountService])
    ], ReportListComponent);
    return ReportListComponent;
}());
export { ReportListComponent };
function getSchoolIdFromName(selectedSchoolName) {
    if (selectedSchoolName && selectedSchoolName !== SCHOOLNAME_DEFAULT_SELECTION) {
        return selectedSchoolName.split('-')[0].trim();
    }
    return null;
}
function getTestCodeFromName(selectedTestName) {
    if (selectedTestName && selectedTestName !== TESTNAME_DEFAULT_SELECTION) {
        return selectedTestName.split('-')[0].trim();
    }
    return null;
}
function getExamCode(selectedExamCode) {
    return selectedExamCode && selectedExamCode !== EXAMNAME_DEFAULT_SELECTION ? selectedExamCode : null;
}
//# sourceMappingURL=report-list.component.js.map