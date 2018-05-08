"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var of_1 = require("rxjs/observable/of");
var delay_1 = require("rxjs/operators/delay");
var QuestionProtocolService = /** @class */ (function () {
    function QuestionProtocolService(http) {
        this.http = http;
        this.endpoint = '/api/onetwothree/protocols';
    }
    QuestionProtocolService.prototype.getAll = function (numberCode) {
        //return this.http.get<ProtocolList[]>(`${this.endpoint}/${numberCode}`);
        return of_1.of([
            {
                ParticipTestId: 17,
                ParticipId: 177,
                ParticipFIO: 'Эсамбаев Хусайн Арбиевич',
                Marks: null,
                ClassId: '0201',
                ClassName: '2 А'
            },
            {
                ParticipTestId: 18,
                ParticipId: 178,
                ParticipFIO: 'Эсамбаев Хусс Арбиевич',
                Marks: '1;1;1;0;1;1;0;1;1;1;0;1',
                ClassId: '0202',
                ClassName: '2 Б'
            },
        ]).pipe(delay_1.delay(3000));
    };
    QuestionProtocolService.prototype.get = function (participTestId) {
        //return this.http.get<QuestionProtocol>(`/api/onetwothree/protocol/${participTestId}`);
        return of_1.of({
            ParticipFIO: 'Эсамбаев Хусайн Арбиевич',
            QuestionMarks: [
                {
                    Name: '1',
                    MaxMark: 1,
                },
                {
                    Name: '2',
                    MaxMark: 2,
                },
                {
                    Name: '3',
                    MaxMark: 4,
                },
                {
                    Name: '4',
                    MaxMark: 4,
                },
                {
                    Name: '5',
                    MaxMark: 5,
                }
            ]
        }).pipe(delay_1.delay(2000));
    };
    QuestionProtocolService.prototype.editMarks = function (participTestId, marks) {
        return this.http.post(this.endpoint + "/" + participTestId, marks, { responseType: 'text' });
        //return of('hegh').pipe(delay(2000));
    };
    QuestionProtocolService.prototype.markAsAbsent = function (participTestId) {
        return this.http.put(this.endpoint + "/" + participTestId + "/markAsAbsent", null, { responseType: 'text' });
        //return of('hegh').pipe(delay(2000));
    };
    QuestionProtocolService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], QuestionProtocolService);
    return QuestionProtocolService;
}());
exports.QuestionProtocolService = QuestionProtocolService;
//# sourceMappingURL=question-protocols.service.js.map