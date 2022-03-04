"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtocolsService = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ProtocolsService = /** @class */ (function () {
    function ProtocolsService(http) {
        this.http = http;
        this.endpoint = '/api/firstclass/protocols';
    }
    ProtocolsService.prototype.getAll = function (options) {
        var params = new http_1.HttpParams();
        if (options.page)
            params = params.append('page', options.page.toString());
        if (options.length)
            params = params.append('length', options.length.toString());
        if (options.search)
            params = params.append('search', options.search);
        if (options.classId)
            params = params.append('classid', options.classId);
        return this.http.get(this.endpoint, { params: params });
    };
    ProtocolsService.prototype.get = function (participTestId) {
        return this.http.get("".concat(this.endpoint, "/").concat(participTestId));
    };
    ProtocolsService.prototype.edit = function (participTestId, protocol) {
        return this.http.post("".concat(this.endpoint, "/").concat(participTestId), protocol, { responseType: 'text' });
    };
    ProtocolsService.prototype.markAsAbsent = function (participTestId) {
        return this.http.put("".concat(this.endpoint, "/").concat(participTestId, "/markAsAbsent"), { responseType: 'text' });
    };
    ProtocolsService = tslib_1.__decorate([
        (0, core_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], ProtocolsService);
    return ProtocolsService;
}());
exports.ProtocolsService = ProtocolsService;
//# sourceMappingURL=protocols.service.js.map