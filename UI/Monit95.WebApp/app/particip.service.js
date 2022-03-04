"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ParticipService = /** @class */ (function () {
    function ParticipService(http) {
        this.http = http;
        this.GET_ALL_PARTICIPS_URL = "/api/particips/GetAll?projectId=";
        this.GET_PARTICIP_URL = "/api/particips/";
        this.ADD_PARTICIP_URL = "/api/particips/post";
        this.UPDATE_PARTICIP_URL = "/api/particips/";
        this.DELETE_PARTICIP_URL = "/api/particips/";
    }
    ParticipService.prototype.getAll = function (projectId) {
        return this.http.get(this.GET_ALL_PARTICIPS_URL + projectId.toString());
    };
    ParticipService.prototype.getParticip = function (participId) {
        return this.http.get(this.GET_PARTICIP_URL + participId.toString());
    };
    ParticipService.prototype.addParticip = function (particip) {
        return this.http.post(this.ADD_PARTICIP_URL, particip).map(function (res) {
            return res.json();
        });
    };
    ParticipService.prototype.updateParticip = function (particip) {
        return this.http.put(this.UPDATE_PARTICIP_URL + particip.Id.toString(), particip);
    };
    ParticipService.prototype.deleteParticip = function (participId) {
        return this.http.delete(this.DELETE_PARTICIP_URL + participId.toString());
    };
    ParticipService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.Http])
    ], ParticipService);
    return ParticipService;
}());
exports.ParticipService = ParticipService;
//# sourceMappingURL=particip.service.js.map