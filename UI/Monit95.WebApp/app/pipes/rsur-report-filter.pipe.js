"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TestNameWithDateFilterPipe = (function () {
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
    return TestNameWithDateFilterPipe;
}());
TestNameWithDateFilterPipe = __decorate([
    core_1.Pipe({ name: 'testNameWithDateFilter' })
], TestNameWithDateFilterPipe);
exports.TestNameWithDateFilterPipe = TestNameWithDateFilterPipe;
var SchoolNameFilterPipe = (function () {
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
    return SchoolNameFilterPipe;
}());
SchoolNameFilterPipe = __decorate([
    core_1.Pipe({ name: 'schoolNameFilter' })
], SchoolNameFilterPipe);
exports.SchoolNameFilterPipe = SchoolNameFilterPipe;
var TestIdPipe = (function () {
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
    return TestIdPipe;
}());
TestIdPipe = __decorate([
    core_1.Pipe({ name: 'testNameFilter' })
], TestIdPipe);
exports.TestIdPipe = TestIdPipe;
var TotalFilterPipe = (function () {
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
    return TotalFilterPipe;
}());
TotalFilterPipe = __decorate([
    core_1.Pipe({ name: 'totalFilter' })
], TotalFilterPipe);
exports.TotalFilterPipe = TotalFilterPipe;
//# sourceMappingURL=rsur-report-filter.pipe.js.map