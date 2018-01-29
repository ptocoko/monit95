"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ParticipProtocolsService = /** @class */ (function () {
    function ParticipProtocolsService(http) {
        this.http = http;
        this.endpoint = '/api/particip/protocols/';
    }
    ParticipProtocolsService.prototype.getProtocolsList = function (projectId) {
        return this.http.get(this.endpoint + projectId);
    };
    ParticipProtocolsService.prototype.getProtocol = function (documNumber) {
        return this.http.get(this.endpoint + documNumber);
    };
    ParticipProtocolsService.prototype.postMarksProtocol = function (questionResults, documNumber) {
        return this.http.post(this.endpoint + documNumber, questionResults, { responseType: 'text' });
    };
    ParticipProtocolsService.prototype.markAsAbsent = function (participTestId) {
        return this.http.put(this.endpoint + participTestId + '/markAsAbsent', 'wasnot', { responseType: 'text' });
    };
    ParticipProtocolsService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], ParticipProtocolsService);
    return ParticipProtocolsService;
}());
exports.ParticipProtocolsService = ParticipProtocolsService;
//# sourceMappingURL=particip-protocols.service.js.map