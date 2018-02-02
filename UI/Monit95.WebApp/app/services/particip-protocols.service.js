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
    };
    ParticipProtocolsService.prototype.getProtocol = function (participTestId) {
        return this.http.get(this.endpoint + "questionProtocols?participTestId=" + participTestId);
    };
    ParticipProtocolsService.prototype.postMarksProtocol = function (postQuestionResults, participTestId) {
        return this.http.post(this.endpoint + "participTests/" + participTestId + "/questionProtocols", postQuestionResults, { responseType: 'text' });
    };
    //putMarksProtocol(putQuestionResults: QuestionProtocolPut[]) {
    //	return this.http.put(this.endpoint + 'questionResults', putQuestionResults, { responseType: 'text' });
    //	//console.log(putQuestionResults);
    //	//return Observable.of('hehe').delay(500);
    //}
    ParticipProtocolsService.prototype.markAsAbsent = function (participTestId) {
        return this.http.put(this.endpoint + "participTests/" + participTestId, 'wasnot', { responseType: 'text' });
    };
    ParticipProtocolsService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], ParticipProtocolsService);
    return ParticipProtocolsService;
}());
exports.ParticipProtocolsService = ParticipProtocolsService;
//# sourceMappingURL=particip-protocols.service.js.map