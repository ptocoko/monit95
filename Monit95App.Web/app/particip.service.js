"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ParticipService = (function () {
    function ParticipService(http) {
        this.http = http;
        this.GET_ALL_PARTICIPS_URL = "/api/particips/GetAll?projectId=";
        this.GET_PARTICIP_URL = "/api/particips/";
        this.ADD_PARTICIP_URL = "/api/particips/post";
        this.UPDATE_PARTICIP_URL = "/api/particips/";
        this.DELETE_PARTICIP_URL = "/api/particips/";
    }
    ParticipService.prototype.getAll = function (projectId) {
        return this.http.get(this.GET_ALL_PARTICIPS_URL + projectId.toString());
    };
    ParticipService.prototype.getParticip = function (participId) {
        return this.http.get(this.GET_PARTICIP_URL + participId.toString());
    };
    ParticipService.prototype.addParticip = function (particip) {
        return this.http.post(this.ADD_PARTICIP_URL, particip).map(function (res) {
            return res.json();
        });
    };
    ParticipService.prototype.updateParticip = function (particip) {
        return this.http.put(this.UPDATE_PARTICIP_URL + particip.Id.toString(), particip);
    };
    ParticipService.prototype.deleteParticip = function (participId) {
        return this.http.delete(this.DELETE_PARTICIP_URL + participId.toString());
    };
    return ParticipService;
}());
ParticipService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ParticipService);
exports.ParticipService = ParticipService;
//# sourceMappingURL=particip.service.js.map