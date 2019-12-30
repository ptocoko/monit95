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
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
var dataSourceMapperFunc = function (particip) {
    switch (particip.DataSource) {
        case 'school':
            particip.DataSource = 'Школа';
            break;
        default:
            break;
    }
    return particip;
};
var ɵ0 = dataSourceMapperFunc;
var ParticipService = /** @class */ (function () {
    function ParticipService(http) {
        this.http = http;
        this.endpoint = "/api/ITakeEGE/participants/";
        this.ogeEndpoint = '/api/oge/participants';
    }
    ParticipService.prototype.getAll = function () {
        return this.http.get(this.endpoint).pipe(map(function (particips) {
            // превращаем 'school' в 'Школа'
            particips.forEach(dataSourceMapperFunc);
            return particips;
        }));
    };
    ParticipService.prototype.getAllOge = function () {
        return this.http.get(this.ogeEndpoint).pipe(map(function (particips) {
            // превращаем 'school' в 'Школа'
            particips.forEach(dataSourceMapperFunc);
            return particips;
        }));
    };
    ParticipService.prototype.getByProjectId = function (projectId) {
        return this.http.get(this.endpoint + "/" + projectId).pipe(map(function (particips) {
            // превращаем 'school' в 'Школа'
            particips.forEach(dataSourceMapperFunc);
            return particips;
        }));
    };
    ParticipService.prototype.getParticip = function (participId) {
        return this.http.get(this.endpoint + participId).pipe(map(dataSourceMapperFunc));
    };
    ParticipService.prototype.postParticip = function (particip, projectId) {
        return this.http.post(this.endpoint, particip, { responseType: 'text', params: { 'projectId': projectId.toString() } });
    };
    ParticipService.prototype.putParticip = function (particip, participId) {
        return this.http.put(this.endpoint + participId, particip, { responseType: 'text' });
    };
    ParticipService.prototype.deleteParticip = function (participId) {
        return this.http.delete(this.endpoint + participId, { responseType: 'text' });
    };
    ParticipService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], ParticipService);
    return ParticipService;
}());
export { ParticipService };
export { ɵ0 };
//# sourceMappingURL=particip.service.js.map