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
        console.log('Start testNameWithDateFilter');
        var result = [];
        if (reports === undefined || schoolName === undefined || schoolName === 'Все организации') {
            console.log('if');
            result = reports.map(function (report) { return report.TestNameWithDate; })
                .filter(function (value, index, self) { return self.indexOf(value) === index; });
            console.log(result);
        }
        else {
            console.log('else');
            result = reports.filter(function (report) { return report.SchoolParticipInfo.SchoolName === schoolName; })
                .map(function (report) { return report.TestNameWithDate; })
                .filter(function (value, index, self) { return self.indexOf(value) === index; });
            console.log(result);
        }
        console.log('End testNameWithDateFilter');
        return result;
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
        console.log(reports);
        if (reports === undefined || testNameWithDate === undefined || testNameWithDate === 'Все блоки') {
            return reports.map(function (report) { return report.SchoolParticipInfo.SchoolName; })
                .filter(function (value, index, self) { return self.indexOf(value) === index; });
        }
        else {
            return reports.filter(function (report) { return report.TestNameWithDate === testNameWithDate; })
                .map(function (report) { return report.SchoolParticipInfo.SchoolName; })
                .filter(function (value, index, self) { return self.indexOf(value) === index; });
        }
    };
    return SchoolNameFilterPipe;
}());
SchoolNameFilterPipe = __decorate([
    core_1.Pipe({ name: 'schoolNameFilter' })
], SchoolNameFilterPipe);
exports.SchoolNameFilterPipe = SchoolNameFilterPipe;
//# sourceMappingURL=report-filter.pipe.js.map