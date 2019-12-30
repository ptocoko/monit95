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
var QuestionProtocolService = /** @class */ (function () {
    function QuestionProtocolService(http) {
        this.http = http;
        this.endpoint = '/api/onetwothree/protocols';
    }
    QuestionProtocolService.prototype.getAll = function (projectTestId) {
        return this.http.get(this.endpoint + "/" + projectTestId);
    };
    QuestionProtocolService.prototype.get = function (participTestId) {
        return this.http.get("/api/onetwothree/protocol/" + participTestId);
    };
    QuestionProtocolService.prototype.editMarks = function (participTestId, protocol) {
        return this.http.post(this.endpoint + "/" + participTestId, protocol, { responseType: 'text' });
    };
    QuestionProtocolService.prototype.markAsAbsent = function (participTestId) {
        return this.http.put(this.endpoint + "/" + participTestId + "/markAsAbsent", null, { responseType: 'text' });
    };
    QuestionProtocolService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], QuestionProtocolService);
    return QuestionProtocolService;
}());
export { QuestionProtocolService };
//# sourceMappingURL=question-protocols.service.js.map