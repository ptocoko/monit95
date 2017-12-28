"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var rsur_report_service_1 = require("../../../../services/rsur-report.service");
var account_service_1 = require("../../../../services/account.service");
var material_1 = require("@angular/material");
var TEST_DATE = '2017-10-11';
exports.SCHOOLNAME_DEFAULT_SELECTION = 'все организации';
exports.TESTNAME_DEFAULT_SELECTION = 'все блоки';
exports.EXAMNAME_DEFAULT_SELECTION = 'все диагностики';
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
        this.selectedSchool = schoolFromStorage ? schoolFromStorage : exports.SCHOOLNAME_DEFAULT_SELECTION;
        var testFromStorage = localStorage.getItem('selectedTest');
        this.selectedTest = testFromStorage ? testFromStorage : exports.TESTNAME_DEFAULT_SELECTION;
        var examFromStorage = localStorage.getItem('selectedExam');
        this.selectedExam = examFromStorage ? examFromStorage : exports.EXAMNAME_DEFAULT_SELECTION;
        this.isLoading = true;
        this.rsurReportService.getReports().subscribe(function (reports) {
            _this.reportsList = reports;
            _this.dataSource = new material_1.MatTableDataSource(reports);
            $().ready(function () { return _this.dataSource.paginator = _this.paginator; });
            _this.isLoading = false;
        });
    };
    /**
     * Метод-обработчик для события focus в input'е "поиск участника". Сбрасывает все значения фильтрации для данных в таблице.
    Сброс происходит только если значение input'а пустое
     * @param value
     */
    ReportListComponent.prototype.searchInputFocused = function (value) {
        if (!value) {
            this.resetAllSelects();
            //сбрасываем paginator на первую страницу
            this.paginator.pageIndex = 0;
        }
    };
    /**
     * Метод-обработчик для события keyup и поиска среди данных в таблице по коду участника и ФИО.
     * @param searchText
     */
    ReportListComponent.prototype.searchParticip = function (searchText) {
        this.dataSource.filterPredicate = participSearchPredicate;
        this.dataSource.filter = searchText.toLowerCase();
    };
    /**
     * метод-обработчик события change для всех select, который делает фильтрацию данных таблицы по значениям всех select'ов сразу
     */
    ReportListComponent.prototype.filterSelectionChange = function () {
        //во время фильтрации данных по значеиям из select'ов сбрасываем поиск по коду участника и ФИО
        this.searchParticipText = '';
        //сбрасываем paginator на первую страницу
        this.paginator.pageIndex = 0;
        this.dataSource.filterPredicate = filterBySelectionsPredicate;
        this.dataSource.filter = this.selectedSchool + ";" + this.selectedTest + ";" + this.selectedExam;
    };
    ReportListComponent.prototype.openReport = function (report) {
        if (report.TestStatus.toLowerCase() !== 'отсутствовал' && report.ExamName.toLowerCase() !== 'апрель-2017') {
            localStorage.setItem('selectedSchool', this.selectedSchool);
            localStorage.setItem('selectedTest', this.selectedTest);
            localStorage.setItem('selectedExam', this.selectedExam);
            this.route.navigate(['/rsur/report', report.RsurParticipTestId]);
        }
    };
    /**
     * Сбрасывает все значения select'ов.
     */
    ReportListComponent.prototype.resetAllSelects = function () {
        this.selectedSchool = exports.SCHOOLNAME_DEFAULT_SELECTION;
        this.selectedTest = exports.TESTNAME_DEFAULT_SELECTION;
        this.selectedExam = exports.EXAMNAME_DEFAULT_SELECTION;
        //так как значения select'ов изменены в коде необходимо принудительно вызвать их метод-обработчик для change
        this.filterSelectionChange();
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
/**
 * Предикат для фильтрации данных в MatTable по значениям всех select'ов.
TODO: требует рефакторинга.
 * @param report единичный экземпляр из фильруемого списка
 * @param filterValuesString значение для фильрации из всех списков, представленные в строковом виде
и объединенные через точку с запятой. ('{schoolName};{testName};{examName}').
 */
var filterBySelectionsPredicate = function (report, filterValuesString) {
    var filterValues = filterValuesString.split(';');
    if (filterValues.length !== 3)
        throw Error("something wrong with " + filterValuesString);
    var schoolName = filterValues[0];
    var testName = filterValues[1];
    var examName = filterValues[2];
    var result = true;
    //каждое значение select'а сверяется с соответствующим значением по умолчанию
    //
    if (!schoolName || schoolName !== exports.SCHOOLNAME_DEFAULT_SELECTION) {
        result = result && report.SchoolParticipInfo.SchoolName === schoolName;
    }
    else {
        result = result && true;
    }
    if (testName !== exports.TESTNAME_DEFAULT_SELECTION) {
        result = result && report.TestName == testName;
    }
    else {
        result = result && true;
    }
    if (examName !== exports.EXAMNAME_DEFAULT_SELECTION) {
        result = result && report.ExamName === examName;
    }
    else {
        result = result && true;
    }
    return result;
};
//# sourceMappingURL=report-list.component.js.map