"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var MOCK_RESULT = {
    ParticipTestId: 17,
    Surname: 'Эсамбаев',
    Name: 'Хусайн',
    SecondName: 'Арбиевич',
    ClassName: '1 А',
    SchoolName: 'Школа крутости №1',
    PrimaryMark: 17,
    GradeGroup: 'Группа самых крутых',
    Marks: ['2', '0.5', '0.5', '1', '0']
};
var ResultsService = /** @class */ (function () {
    function ResultsService(http) {
        this.http = http;
    }
    ResultsService.prototype.getClassParticipResultDto = function (participTestId) {
        //return this.http.get('/api/ResultReport/' + participTestId.toString());
        //return Observable.of(MOCK_RESULT).map(MOCK => MOCK);
    };
    ResultsService.prototype.getClassParticipResultReport = function (participTestId) {
        return this.http.get('/api/ResultReport/Get?participTestId=' + participTestId);
    };
    ResultsService.prototype.getResultsZipForSchool = function (schoolId) {
        return this.http.get('/api/ResultReport/GetForSchool?schoolId=' + schoolId);
    };
    ResultsService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.Http])
    ], ResultsService);
    return ResultsService;
}());
exports.ResultsService = ResultsService;
//# sourceMappingURL=results.service.js.map