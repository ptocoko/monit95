"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var endpoint = 'api/onetwothree/particips';
var ParticipService = /** @class */ (function () {
    function ParticipService(httpClient) {
        this.httpClient = httpClient;
    }
    ParticipService.prototype.getAll = function () {
        return this.httpClient.get(endpoint);
    };
    ParticipService.prototype.get = function (participId) {
        return this.httpClient.get(endpoint + "/" + participId);
    };
    ParticipService.prototype.update = function (particip) {
        return this.httpClient.put(endpoint + "/" + particip.Id, particip, { responseType: 'text' });
    };
    ParticipService.prototype.post = function (particip) {
        return this.httpClient.post(endpoint, particip, { responseType: 'text' });
    };
    ParticipService.prototype.deleteParticip = function (participId) {
        return this.httpClient.delete(endpoint + "/" + participId, { responseType: 'text' });
    };
    ParticipService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], ParticipService);
    return ParticipService;
}());
exports.ParticipService = ParticipService;
//# sourceMappingURL=particips.service.js.map