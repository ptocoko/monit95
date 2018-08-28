"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ProtocolsService = /** @class */ (function () {
    function ProtocolsService(http) {
        this.http = http;
        this.endpoint = '/api/firstclass/protocols';
    }
    ProtocolsService.prototype.getAll = function () {
        return this.http.get(this.endpoint);
    };
    ProtocolsService.prototype.get = function (participTestId) {
        return this.http.get(this.endpoint + "/" + participTestId);
    };
    ProtocolsService.prototype.edit = function (participTestId, protocol) {
        return this.http.post(this.endpoint + "/" + participTestId, protocol, { responseType: 'text' });
    };
    ProtocolsService.prototype.markAsAbsent = function (participTestId) {
        return this.http.put(this.endpoint + "/" + participTestId + "/markAsAbsent", { responseType: 'text' });
    };
    ProtocolsService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], ProtocolsService);
    return ProtocolsService;
}());
exports.ProtocolsService = ProtocolsService;
//# sourceMappingURL=protocols.service.js.map