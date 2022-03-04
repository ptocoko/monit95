"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaService = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var AreaService = /** @class */ (function () {
    function AreaService(http) {
        this.http = http;
    }
    AreaService.prototype.getAll = function () {
        return this.http.get('api/areas');
    };
    AreaService = tslib_1.__decorate([
        (0, core_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], AreaService);
    return AreaService;
}());
exports.AreaService = AreaService;
//# sourceMappingURL=area.service.js.map