"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var TestNameWithDateFilterPipe = /** @class */ (function () {
    function TestNameWithDateFilterPipe() {
    }
    TestNameWithDateFilterPipe.prototype.transform = function (reports, schoolName) {
        var result = [];
        if (reports === undefined || schoolName === undefined || schoolName === 'Все организации') {
            result = reports.map(function (report) { return report.TestNameWithDate; });
        }
        else {
            result = reports.filter(function (report) { return report.SchoolParticipInfo.SchoolName === schoolName; })
                .map(function (report) { return report.TestNameWithDate; });
        }
        return result.filter(function (value, index, self) { return self.indexOf(value) === index; });
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
    SchoolNameFilterPipe.prototype.transform = function (reports, testNameWithDate) {
        var result = [];
        if (reports === undefined || testNameWithDate === undefined || testNameWithDate === 'Все блоки') {
            result = reports.map(function (report) { return report.SchoolParticipInfo.SchoolName; });
        }
        else {
            result = reports.filter(function (report) { return report.TestNameWithDate === testNameWithDate; })
                .map(function (report) { return report.SchoolParticipInfo.SchoolName; });
        }
        return result.filter(function (value, index, self) { return self.indexOf(value) === index; });
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
        if (testName && testName !== 'Все блоки') {
            var res = results.filter(function (s) { return s.TestNameWithDate === testName; });
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
var TotalFilterPipe = /** @class */ (function () {
    function TotalFilterPipe() {
    }
    TotalFilterPipe.prototype.transform = function (reports, selectedSchool, selectedTest) {
        if (selectedSchool === undefined || selectedTest === undefined) {
            return reports;
        }
        if (selectedSchool !== 'Все организации') {
            reports = reports.filter(function (report) { return report.SchoolParticipInfo.SchoolName === selectedSchool; });
        }
        if (selectedTest !== 'Все блоки') {
            reports = reports.filter(function (report) { return report.TestNameWithDate === selectedTest; });
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