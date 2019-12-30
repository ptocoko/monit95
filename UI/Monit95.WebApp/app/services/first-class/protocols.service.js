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
import { HttpClient, HttpParams } from '@angular/common/http';
var ProtocolsService = /** @class */ (function () {
    function ProtocolsService(http) {
        this.http = http;
        this.endpoint = '/api/firstclass/protocols';
    }
    ProtocolsService.prototype.getAll = function (options) {
        var params = new HttpParams();
        if (options.page)
            params = params.append('page', options.page.toString());
        if (options.length)
            params = params.append('length', options.length.toString());
        if (options.search)
            params = params.append('search', options.search);
        if (options.classId)
            params = params.append('classid', options.classId);
        return this.http.get(this.endpoint, { params: params });
    };
    ProtocolsService.prototype.get = function (participTestId) {
        return this.http.get(this.endpoint + "/" + participTestId);
    };
    ProtocolsService.prototype.edit = function (participTestId, protocol) {
        return this.http.post(this.endpoint + "/" + participTestId, protocol, { responseType: 'text' });
    };
    ProtocolsService.prototype.markAsAbsent = function (participTestId) {
        return this.http.put(this.endpoint + "/" + participTestId + "/markAsAbsent", { responseType: 'text' });
    };
    ProtocolsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], ProtocolsService);
    return ProtocolsService;
}());
export { ProtocolsService };
//# sourceMappingURL=protocols.service.js.map