"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var RsurParticipService = /** @class */ (function () {
    function RsurParticipService(http) {
        this.http = http;
        this.ROUTE_PREFIX = 'api/rsurParticips';
    }
    RsurParticipService.prototype.createParticip = function (obj) {
        return this.http.post(this.ROUTE_PREFIX + '/Post', obj);
    };
    RsurParticipService.prototype.getAll = function () {
        return this.http.get(this.ROUTE_PREFIX);
    };
    RsurParticipService.prototype.update = function (code, particip) {
        return this.http.put(this.ROUTE_PREFIX + "/" + particip.Code, particip);
    };
    RsurParticipService.prototype.delete = function (code) {
        return this.http.delete(this.ROUTE_PREFIX + "/" + code);
    };
    RsurParticipService.prototype.downloadFile = function (data) {
        var blob = new Blob([data]);
        var url = window.URL.createObjectURL(blob);
        window.open(url);
    };
    RsurParticipService = tslib_1.__decorate([
        core_1.Component({
            providers: [http_1.Http]
        }),
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.Http])
    ], RsurParticipService);
    return RsurParticipService;
}());
exports.RsurParticipService = RsurParticipService;
//# sourceMappingURL=rsur-particip.service.js.map