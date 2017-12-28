"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var rsur_report_service_1 = require("../../../../services/rsur-report.service");
var account_service_1 = require("../../../../services/account.service");
var material_1 = require("@angular/material");
var TEST_DATE = '2017-10-11';
var ReportListComponent = /** @class */ (function () {
    function ReportListComponent(rsurReportService, route, accountService) {
        this.rsurReportService = rsurReportService;
        this.route = route;
        this.accountService = accountService;
        this.displayedColumns = ['number', 'code', 'surname', 'name', 'secondName', 'schoolName', 'examName', 'testStatus'];
        this.dataSource = new material_1.MatTableDataSource();
    }
    ReportListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var schoolFromStorage = localStorage.getItem('selectedSchool');
        this.selectedSchool = schoolFromStorage ? schoolFromStorage : 'все организации';
        var testFromStorage = localStorage.getItem('selectedTest');
        this.selectedTest = testFromStorage ? testFromStorage : 'все блоки';
        var examFromStorage = localStorage.getItem('selectedExam');
        this.selectedExam = examFromStorage ? examFromStorage : 'все диагностики';
        this.isLoading = true;
        this.rsurReportService.getReports().subscribe(function (reports) {
            _this.reportsList = reports;
            _this.dataSource = new material_1.MatTableDataSource(reports);
            $().ready(function () { return _this.dataSource.paginator = _this.paginator; });
            _this.isLoading = false;
        });
    };
    ReportListComponent.prototype.searchParticip = function (searchText) {
        this.dataSource.filterPredicate = participSearchPredicate;
        this.dataSource.filter = searchText.toLowerCase();
    };
    ReportListComponent.prototype.filterByExamName = function (examName) {
        this.dataSource.filterPredicate = examNameFilterPredicate;
        if (examName === 'все диагностики') {
            this.dataSource.filter = null;
        }
        else {
            this.dataSource.filter = examName;
        }
    };
    ReportListComponent.prototype.filterByTestName = function (testName) {
        this.dataSource.filterPredicate = testNameFilterPredicate;
        if (testName === 'все блоки') {
            this.dataSource.filter = null;
        }
        else {
            this.dataSource.filter = testName;
        }
    };
    ReportListComponent.prototype.filterBySchoolName = function (schoolName) {
        this.dataSource.filterPredicate = schoolNameFilterPredicate;
        if (schoolName === 'все организации') {
            this.dataSource.filter = null;
        }
        else {
            this.dataSource.filter = schoolName;
        }
    };
    ReportListComponent.prototype.openReport = function (report) {
        if (report.TestStatus.toLowerCase() !== 'отсутствовал' && report.ExamName.toLowerCase() !== 'апрель-2017') {
            localStorage.setItem('selectedSchool', this.selectedSchool);
            localStorage.setItem('selectedTest', this.selectedTest);
            localStorage.setItem('selectedExam', this.selectedExam);
            this.route.navigate(['/rsur/report', report.RsurParticipTestId]);
        }
    };
    ReportListComponent.prototype.resetAllInputs = function () {
        this.selectedSchool = 'все организации';
        this.selectedTest = 'все блоки';
        this.selectedExam = 'все диагностики';
    };
    tslib_1.__decorate([
        core_1.ViewChild('paginator'),
        tslib_1.__metadata("design:type", material_1.MatPaginator)
    ], ReportListComponent.prototype, "paginator", void 0);
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
var participSearchPredicate = function (particip, searchText) {
    return particip.ParticipCode.toString().indexOf(searchText) > -1 ||
        particip.SchoolParticipInfo.Surname.toLowerCase().indexOf(searchText) > -1 ||
        particip.SchoolParticipInfo.Name.toLowerCase().indexOf(searchText) > -1;
};
var schoolNameFilterPredicate = function (report, schoolName) {
    return report.SchoolParticipInfo.SchoolName === schoolName;
};
var testNameFilterPredicate = function (report, testName) {
    return report.TestName === testName;
};
var examNameFilterPredicate = function (report, examName) {
    return report.ExamName === examName;
};
//# sourceMappingURL=report-list.component.js.map