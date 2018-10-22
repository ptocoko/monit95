"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            return of_1.of(this.areaSchools[areaCode]);
        }
        ;
        return this.http.get(this.ROUTE_PREFIX + "/" + areaCode).map(function (model) {
            _this.areaSchools[areaCode] = model;
            return model;
        });
    };
    SchoolService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], SchoolService);
    return SchoolService;
}());
exports.SchoolService = SchoolService;
//# sourceMappingURL=school.service.js.map