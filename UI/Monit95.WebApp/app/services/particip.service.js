"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var dataSourceMapperFunc = function (particip) {
    switch (particip.DataSource) {
        case 'school':
            particip.DataSource = 'Школа';
            break;
        default:
            break;
    }
    return particip;
};
var ParticipService = /** @class */ (function () {
    function ParticipService(http) {
        this.http = http;
        this.endpoint = "/api/ITakeEGE/participants/";
    }
    ParticipService.prototype.getAll = function () {
        return this.http.get(this.endpoint).map(function (particips) {
            // превращаем 'school' в 'Школа'
            particips.forEach(dataSourceMapperFunc);
            return particips;
        });
    };
    ParticipService.prototype.getParticip = function (participId) {
        return this.http.get(this.endpoint + participId).map(dataSourceMapperFunc);
    };
    ParticipService.prototype.postParticip = function (particip) {
        return this.http.post(this.endpoint, particip, { responseType: 'text' });
    };
    ParticipService.prototype.putParticip = function (particip, participId) {
        return this.http.put(this.endpoint + participId, particip, { responseType: 'text' });
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