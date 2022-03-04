"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionProtocolService = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var QuestionProtocolService = /** @class */ (function () {
    function QuestionProtocolService(http) {
        this.http = http;
        this.endpoint = '/api/onetwothree/protocols';
    }
    QuestionProtocolService.prototype.getAll = function (projectTestId) {
        return this.http.get("".concat(this.endpoint, "/").concat(projectTestId));
    };
    QuestionProtocolService.prototype.get = function (participTestId) {
        return this.http.get("/api/onetwothree/protocol/".concat(participTestId));
    };
    QuestionProtocolService.prototype.editMarks = function (participTestId, protocol) {
        return this.http.post("".concat(this.endpoint, "/").concat(participTestId), protocol, { responseType: 'text' });
    };
    QuestionProtocolService.prototype.markAsAbsent = function (participTestId) {
        return this.http.put("".concat(this.endpoint, "/").concat(participTestId, "/markAsAbsent"), null, { responseType: 'text' });
    };
    QuestionProtocolService = tslib_1.__decorate([
        (0, core_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], QuestionProtocolService);
    return QuestionProtocolService;
}());
exports.QuestionProtocolService = QuestionProtocolService;
//# sourceMappingURL=question-protocols.service.js.map