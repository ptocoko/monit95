"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolService = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var of_1 = require("rxjs/observable/of");
var SchoolService = /** @class */ (function () {
    function SchoolService(http) {
        this.http = http;
        this.ROUTE_PREFIX = 'api/schools';
    }
    SchoolService.prototype.getAll = function () {
        return this.http.get(this.ROUTE_PREFIX);
    };
    SchoolService.prototype.getByAreaCode = function (areaCode) {
        var _this = this;
        if (this.areaSchools[areaCode]) {
            return (0, of_1.of)(this.areaSchools[areaCode]);
        }
        ;
        return this.http.get("".concat(this.ROUTE_PREFIX, "/").concat(areaCode)).map(function (model) {
            _this.areaSchools[areaCode] = model;
            return model;
        });
    };
    SchoolService.prototype.getInfo = function (id) {
        return this.http.get('/api/schools/getInfo', { params: { id: id } });
    };
    SchoolService = tslib_1.__decorate([
        (0, core_1.Injectable)(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], SchoolService);
    return SchoolService;
}());
exports.SchoolService = SchoolService;
//# sourceMappingURL=school.service.js.map