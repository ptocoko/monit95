var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
import { SCHOOLNAME_DEFAULT_SELECTION, TESTNAME_DEFAULT_SELECTION, EXAMNAME_DEFAULT_SELECTION } from '../components/rsur/reports/report-list/report-list.component';
var TestNameWithDateFilterPipe = /** @class */ (function () {
    function TestNameWithDateFilterPipe() {
    }
    TestNameWithDateFilterPipe.prototype.transform = function (reports, schoolName, examName) {
        if (!reports) {
            return [];
        }
        if (schoolName && schoolName !== SCHOOLNAME_DEFAULT_SELECTION) {
            reports = reports.filter(function (report) { return report.SchoolParticipInfo.SchoolName === schoolName; });
        }
        if (examName && examName !== EXAMNAME_DEFAULT_SELECTION) {
            reports = reports.filter(function (report) { return report.ExamName === examName; });
        }
        return reports.map(function (report) { return report.TestName; })
            .filter(function (value, index, self) { return self.indexOf(value) === index; })
            .sort();
    };
    TestNameWithDateFilterPipe = __decorate([
        Pipe({ name: 'testNameWithDateFilter' })
    ], TestNameWithDateFilterPipe);
    return TestNameWithDateFilterPipe;
}());
export { TestNameWithDateFilterPipe };
var SchoolNameFilterPipe = /** @class */ (function () {
    function SchoolNameFilterPipe() {
    }
    SchoolNameFilterPipe.prototype.transform = function (reports, testNameWithDate, examName) {
        if (!reports) {
            return [];
        }
        if (examName && examName !== EXAMNAME_DEFAULT_SELECTION) {
            reports = reports.filter(function (report) { return report.ExamName === examName; });
        }
        if (testNameWithDate && testNameWithDate !== TESTNAME_DEFAULT_SELECTION) {
            reports = reports.filter(function (report) { return report.TestName === testNameWithDate; });
        }
        return reports.map(function (report) { return report.SchoolParticipInfo.SchoolName; }) // select schoolNames
            .filter(function (value, index, self) { return self.indexOf(value) === index; }) // delete dublicates
            .sort(function (a, b) { return a.substr(0, 4) < b.substr(0, 4) ? -1 : 1; }); // sort by schoolId
    };
    SchoolNameFilterPipe = __decorate([
        Pipe({ name: 'schoolNameFilter' })
    ], SchoolNameFilterPipe);
    return SchoolNameFilterPipe;
}());
export { SchoolNameFilterPipe };
var TestIdPipe = /** @class */ (function () {
    function TestIdPipe() {
    }
    TestIdPipe.prototype.transform = function (results, testName) {
        if (testName && testName !== TESTNAME_DEFAULT_SELECTION) {
            var res = results.filter(function (s) { return s.TestName === testName; });
            return res;
        }
        else {
            return results;
        }
    };
    TestIdPipe = __decorate([
        Pipe({ name: 'testNameFilter' })
    ], TestIdPipe);
    return TestIdPipe;
}());
export { TestIdPipe };
var ExamNameFilterPipe = /** @class */ (function () {
    function ExamNameFilterPipe() {
    }
    ExamNameFilterPipe.prototype.transform = function (reports, schoolName, testNameWithDate) {
        if (!reports) {
            return [];
        }
        if (schoolName && schoolName !== SCHOOLNAME_DEFAULT_SELECTION) {
            reports = reports.filter(function (report) { return report.SchoolParticipInfo.SchoolName === schoolName; });
        }
        if (testNameWithDate && testNameWithDate !== TESTNAME_DEFAULT_SELECTION) {
            reports = reports.filter(function (report) { return report.TestName === testNameWithDate; });
        }
        return reports.map(function (report) { return report.ExamName; })
            .filter(function (value, index, self) { return self.indexOf(value) === index; });
    };
    ExamNameFilterPipe = __decorate([
        Pipe({ name: 'examNameFilter' })
    ], ExamNameFilterPipe);
    return ExamNameFilterPipe;
}());
export { ExamNameFilterPipe };
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
    TotalFilterPipe = __decorate([
        Pipe({ name: 'totalFilter' })
    ], TotalFilterPipe);
    return TotalFilterPipe;
}());
export { TotalFilterPipe };
//# sourceMappingURL=rsur-report-filter.pipe.js.map