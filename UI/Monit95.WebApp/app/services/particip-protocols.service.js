"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipProtocolsService = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ParticipProtocolsService = /** @class */ (function () {
    function ParticipProtocolsService(http) {
        this.http = http;
        this.endpoint = '/api/iTakeEge/';
    }
    ParticipProtocolsService.prototype.getProtocolsList = function (projectTestId) {
        return this.http.get(this.endpoint + 'questionProtocols/' + projectTestId);
    };
    ParticipProtocolsService.prototype.getProtocol = function (participTestId) {
        return this.http.get("".concat(this.endpoint, "questionProtocols?participTestId=").concat(participTestId));
    };
    ParticipProtocolsService.prototype.postMarksProtocol = function (postDto, participTestId) {
        return this.http.post("".concat(this.endpoint, "participTests/").concat(participTestId, "/questionProtocols"), postDto, { responseType: 'text' });
    };
    //putMarksProtocol(putQuestionResults: QuestionProtocolPut[]) {
    //	return this.http.put(this.endpoint + 'questionResults', putQuestionResults, { responseType: 'text' });
    //	//console.log(putQuestionResults);
    //	//return Observable.of('hehe').delay(500);
    //}
    ParticipProtocolsService.prototype.markAsAbsent = function (participTestId) {
        return this.http.put("".concat(this.endpoint, "participTests/").concat(participTestId), 'wasnot', { responseType: 'text' });
    };
    ParticipProtocolsService = tslib_1.__decorate([
        (0, core_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], ParticipProtocolsService);
    return ParticipProtocolsService;
}());
exports.ParticipProtocolsService = ParticipProtocolsService;
//# sourceMappingURL=particip-protocols.service.js.map