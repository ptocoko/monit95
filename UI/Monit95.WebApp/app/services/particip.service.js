"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ParticipService = /** @class */ (function () {
    function ParticipService(http) {
        this.http = http;
        this.GET_ALL_PARTICIPS_URL = "/api/particips/GetAll?projectId=";
        this.endpoint = "/api/particips/";
    }
    ParticipService.prototype.getAll = function (projectId) {
        return this.http.get(this.GET_ALL_PARTICIPS_URL + projectId.toString());
    };
    ParticipService.prototype.getParticip = function (participId) {
        return this.http.get(this.endpoint + participId.toString());
    };
    ParticipService.prototype.addParticip = function (particip) {
        return this.http.post(this.endpoint, particip, { responseType: 'text' });
    };
    ParticipService.prototype.updateParticip = function (particip) {
        return this.http.put(this.endpoint + particip.Id, particip, { responseType: 'text' });
    };
    ParticipService.prototype.deleteParticip = function (participId) {
        return this.http.delete(this.endpoint + participId.toString(), { responseType: 'text' });
    };
    ParticipService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], ParticipService);
    return ParticipService;
}());
exports.ParticipService = ParticipService;
//# sourceMappingURL=particip.service.js.map