var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
var endpoint = 'api/onetwothree/particips';
var ParticipService = /** @class */ (function () {
    function ParticipService(httpClient) {
        var _this = this;
        this.httpClient = httpClient;
        this.update = function (particip) {
            return _this.httpClient.put(endpoint + "/" + particip.Id, particip, { responseType: 'text' });
        };
        this.post = function (particip) {
            return _this.httpClient.post(endpoint, particip, { responseType: 'text' });
        };
    }
    ParticipService.prototype.getAll = function (options) {
        var params = new HttpParams();
        if (options.page)
            params = params.append('page', options.page.toString());
        if (options.length)
            params = params.append('length', options.length.toString());
        if (options.search)
            params = params.append('search', options.search);
        if (options.classId)
            params = params.append('classid', options.classId);
        return this.httpClient.get(endpoint, { params: params });
    };
    ParticipService.prototype.get = function (participId) {
        return this.httpClient.get(endpoint + "/" + participId);
    };
    ParticipService.prototype.deleteParticip = function (participId) {
        return this.httpClient.delete(endpoint + "/" + participId, { responseType: 'text' });
    };
    ParticipService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], ParticipService);
    return ParticipService;
}());
export { ParticipService };
//# sourceMappingURL=particips.service.js.map