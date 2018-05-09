"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
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
    QuestionProtocolService.prototype.editMarks = function (participTestId, marks) {
        return this.http.post(this.endpoint + "/" + participTestId, marks, { responseType: 'text' });
    };
    QuestionProtocolService.prototype.markAsAbsent = function (participTestId) {
        return this.http.put(this.endpoint + "/" + participTestId + "/markAsAbsent", null, { responseType: 'text' });
    };
    QuestionProtocolService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], QuestionProtocolService);
    return QuestionProtocolService;
}());
exports.QuestionProtocolService = QuestionProtocolService;
//# sourceMappingURL=question-protocols.service.js.map