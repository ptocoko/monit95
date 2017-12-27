"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var RsurReportService = /** @class */ (function () {
    function RsurReportService(http) {
        this.http = http;
        this.ROUTE_PREFIX = 'api/rsur/participReports';
    }
    RsurReportService.prototype.getReports = function () {
        return this.http.get("" + this.ROUTE_PREFIX);
        //return Observable.of(Reports_MOCK).delay(500);
    };
    RsurReportService.prototype.getReport = function (rsurParticipTestId) {
        return this.http.get(this.ROUTE_PREFIX + "/" + rsurParticipTestId);
    };
    RsurReportService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], RsurReportService);
    return RsurReportService;
}());
exports.RsurReportService = RsurReportService;
var Reports_MOCK = [
    {
        Code: 12345,
        SchoolParticipInfo: {
            Surname: 'Fake1',
            Name: 'Fake1',
            SecondName: 'Fake1',
            SchoolName: '0000 - FakeSchool1'
        },
        TestStatus: 'зачет',
        TestNameWithDate: 'FakeTest1 - 01.01.1000',
        RsurParticipTestId: 1234,
        ExamName: 'FakeExam1'
    },
    {
        Code: 12345,
        SchoolParticipInfo: {
            Surname: 'Fake1',
            Name: 'Fake1',
            SecondName: 'Fake1',
            SchoolName: '0000 - FakeSchool1'
        },
        TestStatus: 'зачет',
        TestNameWithDate: 'FakeTest1 - 01.01.1000',
        RsurParticipTestId: 1234,
        ExamName: 'FakeExam1'
    },
    {
        Code: 54321,
        SchoolParticipInfo: {
            Surname: 'Fake2',
            Name: 'Fake2',
            SecondName: 'Fake2',
            SchoolName: '0000 - FakeSchool2'
        },
        TestStatus: 'незачет',
        TestNameWithDate: 'FakeTest2 - 01.01.1000',
        RsurParticipTestId: 4321,
        ExamName: 'FakeExam2'
    },
    {
        Code: 32154,
        SchoolParticipInfo: {
            Surname: 'Fake3',
            Name: 'Fake3',
            SecondName: 'Fake3',
            SchoolName: '0000 - FakeSchool2'
        },
        TestStatus: 'отсутствовал',
        TestNameWithDate: 'FakeTest2 - 01.01.1000',
        RsurParticipTestId: 1233,
        ExamName: 'FakeExam1'
    },
    {
        Code: 12345,
        SchoolParticipInfo: {
            Surname: 'Fake1',
            Name: 'Fake1',
            SecondName: 'Fake1',
            SchoolName: '0000 - FakeSchool1'
        },
        TestStatus: 'зачет',
        TestNameWithDate: 'FakeTest1 - 01.01.1000',
        RsurParticipTestId: 1234,
        ExamName: 'FakeExam1'
    },
    {
        Code: 12345,
        SchoolParticipInfo: {
            Surname: 'Fake1',
            Name: 'Fake1',
            SecondName: 'Fake1',
            SchoolName: '0000 - FakeSchool1'
        },
        TestStatus: 'зачет',
        TestNameWithDate: 'FakeTest1 - 01.01.1000',
        RsurParticipTestId: 1234,
        ExamName: 'FakeExam1'
    },
    {
        Code: 12345,
        SchoolParticipInfo: {
            Surname: 'Fake1',
            Name: 'Fake1',
            SecondName: 'Fake1',
            SchoolName: '0000 - FakeSchool1'
        },
        TestStatus: 'зачет',
        TestNameWithDate: 'FakeTest1 - 01.01.1000',
        RsurParticipTestId: 1234,
        ExamName: 'FakeExam1'
    },
    {
        Code: 54321,
        SchoolParticipInfo: {
            Surname: 'Fake2',
            Name: 'Fake2',
            SecondName: 'Fake2',
            SchoolName: '0000 - FakeSchool2'
        },
        TestStatus: 'незачет',
        TestNameWithDate: 'FakeTest2 - 01.01.1000',
        RsurParticipTestId: 4321,
        ExamName: 'FakeExam2'
    },
];
//# sourceMappingURL=rsur-report.service.js.map