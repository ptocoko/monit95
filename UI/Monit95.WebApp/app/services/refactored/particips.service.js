"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ParticipsService = /** @class */ (function () {
    function ParticipsService(http) {
        this.http = http;
        this.endpoint = '/api/particips2';
    }
    ParticipsService.prototype.getAll = function (projectId) {
        return this.http.get(this.endpoint + "/" + projectId);
    };
    ParticipsService.prototype.post = function (particip, projectId) {
        return this.http.post(this.endpoint + "/" + projectId, particip, { responseType: 'text' });
    };
    ParticipsService.prototype.delete = function (participId) {
        return this.http.delete(this.endpoint + "/" + participId, { responseType: 'text' });
    };
    ParticipsService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], ParticipsService);
    return ParticipsService;
}());
exports.ParticipsService = ParticipsService;
//# sourceMappingURL=particips.service.js.map