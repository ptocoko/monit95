var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var ParticipProtocolsService = /** @class */ (function () {
    function ParticipProtocolsService(http) {
        this.http = http;
        this.endpoint = '/api/iTakeEge/';
    }
    ParticipProtocolsService.prototype.getProtocolsList = function (projectTestId) {
        return this.http.get(this.endpoint + 'questionProtocols/' + projectTestId);
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
    ParticipProtocolsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], ParticipProtocolsService);
    return ParticipProtocolsService;
}());
export { ParticipProtocolsService };
//# sourceMappingURL=particip-protocols.service.js.map