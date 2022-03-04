"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RsurParticipService = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
var RsurParticipService = /** @class */ (function () {
    function RsurParticipService(http) {
        this.http = http;
        this.ROUTE_PREFIX = 'api/rsurParticips';
    }
    RsurParticipService.prototype.createParticip = function (obj) {
        return this.http.post(this.ROUTE_PREFIX, obj);
    };
    RsurParticipService.prototype.getAll = function () {
        return this.http.get(this.ROUTE_PREFIX);
    };
    RsurParticipService.prototype.update = function (code, particip) {
        return this.http.put("".concat(this.ROUTE_PREFIX, "/").concat(code), particip, { responseType: 'text' });
    };
    RsurParticipService.prototype.delete = function (code) {
        return this.http.delete("".concat(this.ROUTE_PREFIX, "/").concat(code), { responseType: 'text' });
    };
    RsurParticipService.prototype.search = function (options) {
        return this.http.get("".concat(this.ROUTE_PREFIX, "/search"), { params: options });
    };
    RsurParticipService = tslib_1.__decorate([
        (0, core_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], RsurParticipService);
    return RsurParticipService;
}());
exports.RsurParticipService = RsurParticipService;
//# sourceMappingURL=rsur-particip.service.js.map