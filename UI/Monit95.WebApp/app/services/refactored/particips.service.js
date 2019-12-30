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
var ParticipsService = /** @class */ (function () {
    function ParticipsService(http) {
        this.http = http;
        this.endpoint = '/api/particips2';
    }
    ParticipsService.prototype.getAll = function (projectId) {
        return this.http.get(this.endpoint + "/" + projectId);
    };
    ParticipsService.prototype.post = function (particip, projectId) {
        return this.http.post(this.endpoint + "/" + projectId, particip, { responseType: 'text' });
    };
    ParticipsService.prototype.delete = function (participId) {
        return this.http.delete(this.endpoint + "/" + participId, { responseType: 'text' });
    };
    ParticipsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], ParticipsService);
    return ParticipsService;
}());
export { ParticipsService };
//# sourceMappingURL=particips.service.js.map