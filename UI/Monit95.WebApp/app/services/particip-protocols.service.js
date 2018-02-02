"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ParticipProtocolsService = /** @class */ (function () {
    function ParticipProtocolsService(http) {
        this.http = http;
        this.endpoint = '/api/iTakeEge/';
    }
    ParticipProtocolsService.prototype.getProtocolsList = function () {
        return this.http.get(this.endpoint + 'questionProtocols');
        //return Observable.of(questionResults).delay(500);
    };
    ParticipProtocolsService.prototype.getProtocol = function (participTestId) {
        return this.http.get(this.endpoint + "questionProtocols?participTestId=" + participTestId);
        //return Observable.of(questionResultsEdit).delay(500);
    };
    ParticipProtocolsService.prototype.postMarksProtocol = function (postQuestionResults, participTestId) {
        console.log(postQuestionResults);
        return this.http.post(this.endpoint + "participTests/" + participTestId + "/questionProtocols", postQuestionResults, { responseType: 'text' });
        //return Observable.of('hehe').delay(500);
    };
    //putMarksProtocol(putQuestionResults: QuestionProtocolPut[]) {
    //	return this.http.put(this.endpoint + 'questionResults', putQuestionResults, { responseType: 'text' });
    //	//console.log(putQuestionResults);
    //	//return Observable.of('hehe').delay(500);
    //}
    ParticipProtocolsService.prototype.markAsAbsent = function (participTestId) {
        return this.http.put(this.endpoint + "participTests/" + participTestId, 'wasnot', { responseType: 'text' });
        //return Observable.of('wasnot').delay(200);
    };
    ParticipProtocolsService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], ParticipProtocolsService);
    return ParticipProtocolsService;
}());
exports.ParticipProtocolsService = ParticipProtocolsService;
var questionResults = [
    {
        ParticipInfo: 'Esambaev Hus Arbievich',
        ParticipTestId: 17,
        QuestionMarks: '3;3;3;3;3;3;3;3'
    },
    {
        ParticipInfo: 'NeEsambaev NeHus NeArbievich',
        ParticipTestId: 18,
        QuestionMarks: null
    }
];
var questionResultsEdit = {
    ParticipInfo: 'Esambaev Hus Arbievich',
    MarkCollection: [
        {
            AwardedMark: 3,
            MaxMark: 3,
            Order: 1,
            QuestionMarkId: 1
        },
        {
            AwardedMark: 3,
            MaxMark: 3,
            Order: 2,
            QuestionMarkId: 2
        },
        {
            AwardedMark: 3,
            MaxMark: 3,
            Order: 3,
            QuestionMarkId: 3
        },
        {
            AwardedMark: 3,
            MaxMark: 3,
            Order: 4,
            QuestionMarkId: 4
        },
        {
            AwardedMark: 3,
            MaxMark: 3,
            Order: 5,
            QuestionMarkId: 5
        },
        {
            AwardedMark: 3,
            MaxMark: 3,
            Order: 6,
            QuestionMarkId: 6
        },
        {
            AwardedMark: 3,
            MaxMark: 3,
            Order: 7,
            QuestionMarkId: 7
        },
        {
            AwardedMark: 3,
            MaxMark: 3,
            Order: 8,
            QuestionMarkId: 8
        },
        {
            AwardedMark: 3,
            MaxMark: 3,
            Order: 9,
            QuestionMarkId: 9
        }
    ]
};
//# sourceMappingURL=particip-protocols.service.js.map