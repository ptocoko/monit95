"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ParticipService = /** @class */ (function () {
    function ParticipService(http) {
        this.http = http;
        this.GET_ALL_PARTICIPS_URL = "/api/particips/GetAll?projectId=";
        this.GET_PROTOCOLS_URL = '/api/particips/protocols?projectId=';
        this.endpoint = "/api/particips/";
    }
    ParticipService.prototype.getAll = function (projectId) {
        return this.http.get(this.GET_ALL_PARTICIPS_URL + projectId);
    };
    ParticipService.prototype.getParticip = function (participId) {
        return this.http.get(this.endpoint + participId);
    };
    ParticipService.prototype.addParticip = function (particip) {
        return this.http.post(this.endpoint, particip, { responseType: 'text' });
    };
    ParticipService.prototype.updateParticip = function (particip) {
        throw Error('this method not implemented');
    };
    ParticipService.prototype.deleteParticip = function (participId) {
        return this.http.delete(this.endpoint + participId, { responseType: 'text' });
    };
    ParticipService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], ParticipService);
    return ParticipService;
}());
exports.ParticipService = ParticipService;
//# sourceMappingURL=particip.service.js.map