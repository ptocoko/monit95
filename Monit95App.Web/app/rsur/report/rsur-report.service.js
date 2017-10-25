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
var MOCK_REPORT = {
    Code: 15204,
    Surname: 'Эсамбаев',
    Name: 'Хусайн',
    SecondName: 'Арбиевич',
    SchoolName: 'Школа Крутости',
    TestNameWithDate: 'Экзамен на крутость, 17.11.2017',
    IsPassTest: true,
    TestDate: '17.11.2017',
    TestNumberCodeWithName: '0101 — Экзамен на крутость',
    EgeQuestionResults: [
        {
            EgeQuestionNumber: 1,
            RsurQuestionNumbers: '1.1; 1.2; 1.3',
            ElementNames: 'Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости',
            Value: 59
        },
        {
            EgeQuestionNumber: 2,
            RsurQuestionNumbers: '2.1; 2.2; 2.3; 2.4; 2.5; 2.6; 2.7; 2.8; 2.9; 2.10',
            ElementNames: 'Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости',
            Value: 80
        },
        {
            EgeQuestionNumber: 3,
            RsurQuestionNumbers: '2.1; 2.2; 2.3; 2.4',
            ElementNames: 'Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы',
            Value: 60
        },
        {
            EgeQuestionNumber: 4,
            RsurQuestionNumbers: '2.1; 2.2; 2.3; 2.4',
            ElementNames: 'Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы',
            Value: 81
        },
        {
            EgeQuestionNumber: 3,
            RsurQuestionNumbers: '2.1; 2.2; 2.3; 2.4',
            ElementNames: 'Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы',
            Value: 61
        },
        {
            EgeQuestionNumber: 3,
            RsurQuestionNumbers: '2.1; 2.2; 2.3; 2.4',
            ElementNames: 'Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы',
            Value: 70
        },
        {
            EgeQuestionNumber: 3,
            RsurQuestionNumbers: '2.1; 2.2; 2.3; 2.4',
            ElementNames: 'Основы крутости Основы крутости Основы крутости Основы крутости Основы крутости Основы',
            Value: 70
        }
    ]
};
var RsurReportService = (function () {
    function RsurReportService(http) {
        this.http = http;
    }
    RsurReportService.prototype.get = function () {
        return Rx_1.Observable.of(MOCK_REPORT);
    };
    return RsurReportService;
}());
RsurReportService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], RsurReportService);
exports.RsurReportService = RsurReportService;
//# sourceMappingURL=rsur-report.service.js.map