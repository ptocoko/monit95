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
        //return Observable.of(mockParticipProtocol);
    };
    ParticipProtocolsService.prototype.getProtocol = function (participTestId) {
        return this.http.get(this.endpoint + "questionProtocols?participTestId=" + participTestId);
        //return Observable.of(mockParticipProtocol.find(f => f.DocumNumber === documNumber)).map(protocol => {
        //	protocol.QuestionResults.sort(Constant.questionResultsSortFunc);
        //	return protocol;
        //})
    };
    ParticipProtocolsService.prototype.postMarksProtocol = function (postQuestionResults, participTestId) {
        return this.http.post(this.endpoint + "participsTests/" + participTestId + "/questionProtocols", postQuestionResults, { responseType: 'text' });
        //let protocol = mockParticipProtocol.find(f => f.DocumNumber === documNumber);
        //protocol.QuestionResults = questionResults;
        //protocol.Marks = questionResults.map(m => m.CurrentMark).join(';');
        //return Observable.of('hoho');
    };
    ParticipProtocolsService.prototype.putMarksProtocol = function (putQuestionResults) {
        return this.http.put(this.endpoint + 'questionResults', putQuestionResults, { responseType: 'text' });
    };
    ParticipProtocolsService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], ParticipProtocolsService);
    return ParticipProtocolsService;
}());
exports.ParticipProtocolsService = ParticipProtocolsService;
//let mockParticipProtocol: ParticipProtocolModel[] = [
//	{
//		Id: 1,
//		ParticipTestId: 11,
//		Surname: 'test1',
//		Name: 'test',
//		SecondName: 'testtest',
//		ProjectId: 12,
//		Birthday: '12.11.2010',
//		ClassName: '2a',
//		SchoolId: '0005',
//		SchoolName: 'Президенсткая шк',
//		DocumNumber: 12345,
//		DataSource: 'Школа',
//		Marks: '1;2;1;2;3;1;1;0',
//		QuestionResults: [
//			{
//				Name: '1.1',
//				Order: 1,
//				MaxMark: 3,
//				CurrentMark: 1
//			},
//			{
//				Name: '1.3',
//				Order: 3,
//				MaxMark: 3,
//				CurrentMark: 1
//			},
//			{
//				Name: '1.2',
//				Order: 2,
//				MaxMark: 3,
//				CurrentMark: 2
//			},
//			{
//				Name: '2.1',
//				Order: 4,
//				MaxMark: 3,
//				CurrentMark: 2
//			},
//			{
//				Name: '2.2',
//				Order: 5,
//				MaxMark: 3,
//				CurrentMark: 3
//			},
//			{
//				Name: '3',
//				Order: 6,
//				MaxMark: 3,
//				CurrentMark: 1
//			},
//			{
//				Name: '4.1',
//				Order: 7,
//				MaxMark: 3,
//				CurrentMark: 1
//			},
//			{
//				Name: '5',
//				Order: 8,
//				MaxMark: 3,
//				CurrentMark: 0
//			}
//		]
//	},
//	{
//		Id: 2,
//		ParticipTestId: 12,
//		Surname: 'test1',
//		Name: 'test',
//		SecondName: 'testtest',
//		ProjectId: 12,
//		Birthday: '12.11.2010',
//		ClassName: '2a',
//		SchoolId: '0005',
//		SchoolName: 'Президенсткая шк',
//		DocumNumber: 54321,
//		DataSource: 'РЦОИ',
//		Marks: null,
//		QuestionResults: [
//			{
//				Name: '1.1',
//				Order: 1,
//				MaxMark: 3,
//				CurrentMark: null
//			},
//			{
//				Name: '1.3',
//				Order: 3,
//				MaxMark: 3,
//				CurrentMark: null
//			},
//			{
//				Name: '1.2',
//				Order: 2,
//				MaxMark: 3,
//				CurrentMark: null
//			},
//			{
//				Name: '2.1',
//				Order: 4,
//				MaxMark: 3,
//				CurrentMark: null
//			},
//			{
//				Name: '2.2',
//				Order: 5,
//				MaxMark: 3,
//				CurrentMark: null
//			},
//			{
//				Name: '3',
//				Order: 6,
//				MaxMark: 3,
//				CurrentMark: null
//			},
//			{
//				Name: '4.1',
//				Order: 7,
//				MaxMark: 3,
//				CurrentMark: null
//			},
//			{
//				Name: '5',
//				Order: 8,
//				MaxMark: 3,
//				CurrentMark: null
//			}
//		]
//	},
//	{
//		Id: 3,
//		ParticipTestId: 13,
//		Surname: 'test1',
//		Name: 'test',
//		SecondName: 'testtest',
//		ProjectId: 12,
//		Birthday: '12.11.2010',
//		ClassName: '2a',
//		SchoolId: '0005',
//		SchoolName: 'Президенсткая шк',
//		DocumNumber: 98765,
//		DataSource: 'Школа',
//		Marks: '1;2;1;2;3;1;1;0',
//		QuestionResults: [
//			{
//				Name: '1.1',
//				Order: 1,
//				MaxMark: 3,
//				CurrentMark: 1
//			},
//			{
//				Name: '1.3',
//				Order: 3,
//				MaxMark: 3,
//				CurrentMark: 1
//			},
//			{
//				Name: '1.2',
//				Order: 2,
//				MaxMark: 3,
//				CurrentMark: 2
//			},
//			{
//				Name: '2.1',
//				Order: 4,
//				MaxMark: 3,
//				CurrentMark: 2
//			},
//			{
//				Name: '2.2',
//				Order: 5,
//				MaxMark: 3,
//				CurrentMark: 3
//			},
//			{
//				Name: '3',
//				Order: 6,
//				MaxMark: 3,
//				CurrentMark: 1
//			},
//			{
//				Name: '4.1',
//				Order: 7,
//				MaxMark: 3,
//				CurrentMark: 1
//			},
//			{
//				Name: '5',
//				Order: 8,
//				MaxMark: 3,
//				CurrentMark: 0
//			}
//		]
//	}
////] 
//# sourceMappingURL=particip-protocols.service.js.map