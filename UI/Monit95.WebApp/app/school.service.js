"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var SchoolService = /** @class */ (function () {
    function SchoolService(http) {
        this.http = http;
        this.ROUTE_PREFIX = 'api/schools';
    }
    SchoolService.prototype.getAll = function () {
        return this.http.get(this.ROUTE_PREFIX);
    };
    SchoolService = tslib_1.__decorate([
        core_1.Component({
            providers: [http_1.Http]
        }),
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.Http])
    ], SchoolService);
    return SchoolService;
}());
exports.SchoolService = SchoolService;
//# sourceMappingURL=school.service.js.map