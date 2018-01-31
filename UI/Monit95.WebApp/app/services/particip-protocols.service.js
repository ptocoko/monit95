"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var Observable_1 = require("rxjs/Observable");
var constants_1 = require("../shared/constants");
var ParticipProtocolsService = /** @class */ (function () {
    function ParticipProtocolsService(http) {
        this.http = http;
        this.endpoint = '/api/particip/protocols/';
    }
    ParticipProtocolsService.prototype.getProtocolsList = function (projectId) {
        //return this.http.get<ParticipProtocolModel[]>(this.endpoint + projectId);
        return Observable_1.Observable.of(mockParticipProtocol);
    };
    ParticipProtocolsService.prototype.getProtocol = function (documNumber) {
        //return this.http.get<ParticipProtocolModel>(this.endpoint + documNumber);
        return Observable_1.Observable.of(mockParticipProtocol.find(function (f) { return f.DocumNumber === documNumber; })).map(function (protocol) {
            protocol.QuestionResults.sort(constants_1.Constant.questionResultsSortFunc);
            return protocol;
        });
    };
    ParticipProtocolsService.prototype.postMarksProtocol = function (questionResults, documNumber) {
        //return this.http.post(this.endpoint + documNumber, questionResults, { responseType: 'text' });
        var protocol = mockParticipProtocol.find(function (f) { return f.DocumNumber === documNumber; });
        protocol.QuestionResults = questionResults;
        protocol.Marks = questionResults.map(function (m) { return m.CurrentMark; }).join(';');
        return Observable_1.Observable.of('hoho');
    };
    ParticipProtocolsService.prototype.markAsAbsent = function (documNumber) {
        //return this.http.put(this.endpoint + participTestId + '/markAsAbsent', 'wasnot', { responseType: 'text' });
        mockParticipProtocol.find(function (f) { return f.DocumNumber === documNumber; }).Marks = 'wasnot';
        return Observable_1.Observable.of('heh');
    };
    ParticipProtocolsService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], ParticipProtocolsService);
    return ParticipProtocolsService;
}());
exports.ParticipProtocolsService = ParticipProtocolsService;
var mockParticipProtocol = [
    {
        Id: 1,
        ParticipTestId: 11,
        Surname: 'test1',
        Name: 'test',
        SecondName: 'testtest',
        ProjectId: 12,
        Birthday: '12.11.2010',
        ClassName: '2a',
        SchoolId: '0005',
        SchoolName: 'Президенсткая шк',
        DocumNumber: 12345,
        DataSource: 'Школа',
        Marks: '1;2;1;2;3;1;1;0',
        QuestionResults: [
            {
                Name: '1.1',
                Order: 1,
                MaxMark: 3,
                CurrentMark: 1
            },
            {
                Name: '1.3',
                Order: 3,
                MaxMark: 3,
                CurrentMark: 1
            },
            {
                Name: '1.2',
                Order: 2,
                MaxMark: 3,
                CurrentMark: 2
            },
            {
                Name: '2.1',
                Order: 4,
                MaxMark: 3,
                CurrentMark: 2
            },
            {
                Name: '2.2',
                Order: 5,
                MaxMark: 3,
                CurrentMark: 3
            },
            {
                Name: '3',
                Order: 6,
                MaxMark: 3,
                CurrentMark: 1
            },
            {
                Name: '4.1',
                Order: 7,
                MaxMark: 3,
                CurrentMark: 1
            },
            {
                Name: '5',
                Order: 8,
                MaxMark: 3,
                CurrentMark: 0
            }
        ]
    },
    {
        Id: 2,
        ParticipTestId: 12,
        Surname: 'test1',
        Name: 'test',
        SecondName: 'testtest',
        ProjectId: 12,
        Birthday: '12.11.2010',
        ClassName: '2a',
        SchoolId: '0005',
        SchoolName: 'Президенсткая шк',
        DocumNumber: 54321,
        DataSource: 'РЦОИ',
        Marks: null,
        QuestionResults: [
            {
                Name: '1.1',
                Order: 1,
                MaxMark: 3,
                CurrentMark: null
            },
            {
                Name: '1.3',
                Order: 3,
                MaxMark: 3,
                CurrentMark: null
            },
            {
                Name: '1.2',
                Order: 2,
                MaxMark: 3,
                CurrentMark: null
            },
            {
                Name: '2.1',
                Order: 4,
                MaxMark: 3,
                CurrentMark: null
            },
            {
                Name: '2.2',
                Order: 5,
                MaxMark: 3,
                CurrentMark: null
            },
            {
                Name: '3',
                Order: 6,
                MaxMark: 3,
                CurrentMark: null
            },
            {
                Name: '4.1',
                Order: 7,
                MaxMark: 3,
                CurrentMark: null
            },
            {
                Name: '5',
                Order: 8,
                MaxMark: 3,
                CurrentMark: null
            }
        ]
    },
    {
        Id: 3,
        ParticipTestId: 13,
        Surname: 'test1',
        Name: 'test',
        SecondName: 'testtest',
        ProjectId: 12,
        Birthday: '12.11.2010',
        ClassName: '2a',
        SchoolId: '0005',
        SchoolName: 'Президенсткая шк',
        DocumNumber: 98765,
        DataSource: 'Школа',
        Marks: '1;2;1;2;3;1;1;0',
        QuestionResults: [
            {
                Name: '1.1',
                Order: 1,
                MaxMark: 3,
                CurrentMark: 1
            },
            {
                Name: '1.3',
                Order: 3,
                MaxMark: 3,
                CurrentMark: 1
            },
            {
                Name: '1.2',
                Order: 2,
                MaxMark: 3,
                CurrentMark: 2
            },
            {
                Name: '2.1',
                Order: 4,
                MaxMark: 3,
                CurrentMark: 2
            },
            {
                Name: '2.2',
                Order: 5,
                MaxMark: 3,
                CurrentMark: 3
            },
            {
                Name: '3',
                Order: 6,
                MaxMark: 3,
                CurrentMark: 1
            },
            {
                Name: '4.1',
                Order: 7,
                MaxMark: 3,
                CurrentMark: 1
            },
            {
                Name: '5',
                Order: 8,
                MaxMark: 3,
                CurrentMark: 0
            }
        ]
    }
];
//# sourceMappingURL=particip-protocols.service.js.map