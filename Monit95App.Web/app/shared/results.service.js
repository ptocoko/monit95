"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
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
var ResultsService = (function () {
    function ResultsService(http) {
        this.http = http;
    }
    ResultsService.prototype.getClassParticipResultDto = function (participTestId) {
        //return this.http.get('/api/ResultReport/' + participTestId.toString());
        return Rx_1.Observable.of(MOCK_RESULT).map(function (MOCK) { return MOCK; });
    };
    ResultsService.prototype.getClassParticipResultReport = function (participTestId) {
        return this.http.get('/api/ResultReport/Get?participTestId=' + participTestId);
    };
    ResultsService.prototype.getResultsZipForSchool = function (schoolId) {
        return this.http.get('/api/ResultReport/GetForSchool?schoolId=' + schoolId);
    };
    return ResultsService;
}());
ResultsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ResultsService);
exports.ResultsService = ResultsService;
//# sourceMappingURL=results.service.js.map