"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var http_2 = require("@angular/common/http");
var endpoint = 'api/onetwothree/particips';
var ParticipService = /** @class */ (function () {
    function ParticipService(httpClient) {
        var _this = this;
        this.httpClient = httpClient;
        this.update = function (particip) {
            return _this.httpClient.put(endpoint + "/" + particip.Id, particip, { responseType: 'text' });
        };
        this.post = function (particip) {
            return _this.httpClient.post(endpoint, particip, { responseType: 'text' });
        };
    }
    ParticipService.prototype.getAll = function (options) {
        var params = new http_2.HttpParams();
        if (options.page)
            params = params.append('page', options.page.toString());
        if (options.length)
            params = params.append('length', options.length.toString());
        if (options.search)
            params = params.append('search', options.search);
        if (options.classId)
            params = params.append('classid', options.classId);
        return this.httpClient.get(endpoint, { params: params });
    };
    ParticipService.prototype.get = function (participId) {
        return this.httpClient.get(endpoint + "/" + participId);
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