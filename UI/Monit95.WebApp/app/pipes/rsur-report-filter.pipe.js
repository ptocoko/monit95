"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TotalFilterPipe = exports.ExamNameFilterPipe = exports.TestIdPipe = exports.SchoolNameFilterPipe = exports.TestNameWithDateFilterPipe = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var report_list_component_1 = require("../components/rsur/reports/report-list/report-list.component");
var TestNameWithDateFilterPipe = /** @class */ (function () {
    function TestNameWithDateFilterPipe() {
    }
    TestNameWithDateFilterPipe.prototype.transform = function (reports, schoolName, examName) {
        if (!reports) {
            return [];
        }
        if (schoolName && schoolName !== report_list_component_1.SCHOOLNAME_DEFAULT_SELECTION) {
            reports = reports.filter(function (report) { return report.SchoolParticipInfo.SchoolName === schoolName; });
        }
        if (examName && examName !== report_list_component_1.EXAMNAME_DEFAULT_SELECTION) {
            reports = reports.filter(function (report) { return report.ExamName === examName; });
        }
        return reports.map(function (report) { return report.TestName; })
            .filter(function (value, index, self) { return self.indexOf(value) === index; })
            .sort();
    };
    TestNameWithDateFilterPipe = tslib_1.__decorate([
        (0, core_1.Pipe)({ name: 'testNameWithDateFilter' })
    ], TestNameWithDateFilterPipe);
    return TestNameWithDateFilterPipe;
}());
exports.TestNameWithDateFilterPipe = TestNameWithDateFilterPipe;
var SchoolNameFilterPipe = /** @class */ (function () {
    function SchoolNameFilterPipe() {
    }
    SchoolNameFilterPipe.prototype.transform = function (reports, testNameWithDate, examName) {
        if (!reports) {
            return [];
        }
        if (examName && examName !== report_list_component_1.EXAMNAME_DEFAULT_SELECTION) {
            reports = reports.filter(function (report) { return report.ExamName === examName; });
        }
        if (testNameWithDate && testNameWithDate !== report_list_component_1.TESTNAME_DEFAULT_SELECTION) {
            reports = reports.filter(function (report) { return report.TestName === testNameWithDate; });
        }
        return reports.map(function (report) { return report.SchoolParticipInfo.SchoolName; }) // select schoolNames
            .filter(function (value, index, self) { return self.indexOf(value) === index; }) // delete dublicates
            .sort(function (a, b) { return a.substr(0, 4) < b.substr(0, 4) ? -1 : 1; }); // sort by schoolId
    };
    SchoolNameFilterPipe = tslib_1.__decorate([
        (0, core_1.Pipe)({ name: 'schoolNameFilter' })
    ], SchoolNameFilterPipe);
    return SchoolNameFilterPipe;
}());
exports.SchoolNameFilterPipe = SchoolNameFilterPipe;
var TestIdPipe = /** @class */ (function () {
    function TestIdPipe() {
    }
    TestIdPipe.prototype.transform = function (results, testName) {
        if (testName && testName !== report_list_component_1.TESTNAME_DEFAULT_SELECTION) {
            var res = results.filter(function (s) { return s.TestName === testName; });
            return res;
        }
        else {
            return results;
        }
    };
    TestIdPipe = tslib_1.__decorate([
        (0, core_1.Pipe)({ name: 'testNameFilter' })
    ], TestIdPipe);
    return TestIdPipe;
}());
exports.TestIdPipe = TestIdPipe;
var ExamNameFilterPipe = /** @class */ (function () {
    function ExamNameFilterPipe() {
    }
    ExamNameFilterPipe.prototype.transform = function (reports, schoolName, testNameWithDate) {
        if (!reports) {
            return [];
        }
        if (schoolName && schoolName !== report_list_component_1.SCHOOLNAME_DEFAULT_SELECTION) {
            reports = reports.filter(function (report) { return report.SchoolParticipInfo.SchoolName === schoolName; });
        }
        if (testNameWithDate && testNameWithDate !== report_list_component_1.TESTNAME_DEFAULT_SELECTION) {
            reports = reports.filter(function (report) { return report.TestName === testNameWithDate; });
        }
        return reports.map(function (report) { return report.ExamName; })
            .filter(function (value, index, self) { return self.indexOf(value) === index; });
    };
    ExamNameFilterPipe = tslib_1.__decorate([
        (0, core_1.Pipe)({ name: 'examNameFilter' })
    ], ExamNameFilterPipe);
    return ExamNameFilterPipe;
}());
exports.ExamNameFilterPipe = ExamNameFilterPipe;
var TotalFilterPipe = /** @class */ (function () {
    function TotalFilterPipe() {
    }
    TotalFilterPipe.prototype.transform = function (reports, selectedSchool, selectedTest, selectedExam) {
        if (selectedSchool === undefined || selectedTest === undefined || selectedExam === undefined) {
            return reports;
        }
        if (selectedSchool !== 'все организации') {
            reports = reports.filter(function (report) { return report.SchoolParticipInfo.SchoolName === selectedSchool; });
        }
        if (selectedTest !== 'все блоки') {
            reports = reports.filter(function (report) { return report.TestName === selectedTest; });
        }
        if (selectedExam !== 'все диагностики') {
            reports = reports.filter(function (report) { return report.ExamName === selectedExam; });
        }
        return reports;
    };
    TotalFilterPipe = tslib_1.__decorate([
        (0, core_1.Pipe)({ name: 'totalFilter' })
    ], TotalFilterPipe);
    return TotalFilterPipe;
}());
exports.TotalFilterPipe = TotalFilterPipe;
//# sourceMappingURL=rsur-report-filter.pipe.js.map