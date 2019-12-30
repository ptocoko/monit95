var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { map, switchMap, startWith } from 'rxjs/operators';
import { Component } from '@angular/core';
import { SeminarReportService } from '../../../../services/seminar-report.service';
import { AccountService } from '../../../../services/account.service';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
var SeminarReportsListComponent = /** @class */ (function () {
    function SeminarReportsListComponent(seminarReportService, accountService, snackBar) {
        this.seminarReportService = seminarReportService;
        this.accountService = accountService;
        this.snackBar = snackBar;
        this.isLoading = true;
        //reportsLoading: boolean = false;
        this.deleted$ = new Subject();
    }
    SeminarReportsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.deleted$.pipe(startWith({ 'hello': 'there', 'Obi-Wan': 'Kenobi' }), switchMap(function () {
            _this.isLoading = true;
            return _this.seminarReportService.getReportsList();
        }), map(function (reports) {
            _this.isLoading = false;
            _this.reportsLength = reports.length;
            return reports;
        })).
            subscribe(function (reports) { return _this.reports = reports; });
    };
    SeminarReportsListComponent.prototype.deleteReport = function (reportId) {
        var _this = this;
        this.seminarReportService.deleteReport(reportId).subscribe(function (response) {
            _this.deleted$.next('deleted');
            _this.snackBar.open('отчет удален', 'OK', { duration: 3000 });
        });
    };
    SeminarReportsListComponent = __decorate([
        Component({
            selector: 'reports-list',
            templateUrl: './seminar-report-list.component.html',
            styleUrls: ['./seminar-report-list.component.css']
        }),
        __metadata("design:paramtypes", [SeminarReportService,
            AccountService,
            MatSnackBar])
    ], SeminarReportsListComponent);
    return SeminarReportsListComponent;
}());
export { SeminarReportsListComponent };
//# sourceMappingURL=seminar-report-list.component.js.map