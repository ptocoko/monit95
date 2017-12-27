"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var TestNameWithDateFilterPipe = /** @class */ (function () {
    function TestNameWithDateFilterPipe() {
    }
    TestNameWithDateFilterPipe.prototype.transform = function (reports, schoolName, examName) {
        //let results = [...reports]; 
        if (!reports) {
            return [];
        }
        if (schoolName && schoolName !== 'все организации') {
            reports = reports.filter(function (report) { return report.SchoolParticipInfo.SchoolName === schoolName; });
        }
        if (examName && examName !== 'все диагностики') {
            reports = reports.filter(function (report) { return report.ExamName === examName; });
        }
        return reports.map(function (report) { return report.TestName; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
    };
    TestNameWithDateFilterPipe = tslib_1.__decorate([
        core_1.Pipe({ name: 'testNameWithDateFilter' })
    ], TestNameWithDateFilterPipe);
    return TestNameWithDateFilterPipe;
}());
exports.TestNameWithDateFilterPipe = TestNameWithDateFilterPipe;
var SchoolNameFilterPipe = /** @class */ (function () {
    function SchoolNameFilterPipe() {
    }
    SchoolNameFilterPipe.prototype.transform = function (reports, testNameWithDate, examName) {
        //let results = [...reports];
        if (!reports) {
            return [];
        }
        if (examName && examName !== 'все диагностики') {
            reports = reports.filter(function (report) { return report.ExamName === examName; });
        }
        if (testNameWithDate && testNameWithDate !== 'все блоки') {
            reports = reports.filter(function (report) { return report.TestName === testNameWithDate; });
        }
        return reports.map(function (report) { return report.SchoolParticipInfo.SchoolName; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
    };
    SchoolNameFilterPipe = tslib_1.__decorate([
        core_1.Pipe({ name: 'schoolNameFilter' })
    ], SchoolNameFilterPipe);
    return SchoolNameFilterPipe;
}());
exports.SchoolNameFilterPipe = SchoolNameFilterPipe;
var TestIdPipe = /** @class */ (function () {
    function TestIdPipe() {
    }
    TestIdPipe.prototype.transform = function (results, testName) {
        if (testName && testName !== 'все блоки') {
            var res = results.filter(function (s) { return s.TestName === testName; });
            return res;
        }
        else {
            return results;
        }
    };
    TestIdPipe = tslib_1.__decorate([
        core_1.Pipe({ name: 'testNameFilter' })
    ], TestIdPipe);
    return TestIdPipe;
}());
exports.TestIdPipe = TestIdPipe;
var ExamNameFilterPipe = /** @class */ (function () {
    function ExamNameFilterPipe() {
    }
    ExamNameFilterPipe.prototype.transform = function (reports, schoolName, testNameWithDate) {
        //let results = [...reports];
        if (!reports) {
            return [];
        }
        if (schoolName && schoolName !== 'все организации') {
            reports = reports.filter(function (report) { return report.SchoolParticipInfo.SchoolName === schoolName; });
        }
        if (testNameWithDate && testNameWithDate !== 'все блоки') {
            reports = reports.filter(function (report) { return report.TestName === testNameWithDate; });
        }
        return reports.map(function (report) { return report.ExamName; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
    };
    ExamNameFilterPipe = tslib_1.__decorate([
        core_1.Pipe({ name: 'examNameFilter' })
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
        core_1.Pipe({ name: 'totalFilter' })
    ], TotalFilterPipe);
    return TotalFilterPipe;
}());
exports.TotalFilterPipe = TotalFilterPipe;
//# sourceMappingURL=rsur-report-filter.pipe.js.map