var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
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
            return of(this.areaSchools[areaCode]);
        }
        ;
        return this.http.get(this.ROUTE_PREFIX + "/" + areaCode).pipe(map(function (model) {
            _this.areaSchools[areaCode] = model;
            return model;
        }));
    };
    SchoolService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], SchoolService);
    return SchoolService;
}());
export { SchoolService };
//# sourceMappingURL=school.service.js.map