"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ClassService = /** @class */ (function () {
    function ClassService(http) {
        this.http = http;
        this.GET_CLASSES_URL = "/api/classes";
    }
    ClassService.prototype.getClassNames = function () {
        return this.http.get(this.GET_CLASSES_URL).map(function (res) {
            return res.map(function (schoolClass) {
                return schoolClass.Name;
            });
        });
    };
    ClassService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], ClassService);
    return ClassService;
}());
exports.ClassService = ClassService;
//# sourceMappingURL=class.service.js.map