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
var http_1 = require("@angular/common/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
var protocolScanModel = {
    FileId: 123,
    Url: '/Images/rsur-scans/2090/1000/1.jpg',
    FileName: 'IMG_0001_01.JPG',
    StillHasScans: false
};
var RsurProtocolsService = (function () {
    function RsurProtocolsService(http) {
        this.http = http;
    }
    RsurProtocolsService.prototype.getScan = function (fileId) {
        return Observable_1.Observable.of(protocolScanModel);
    };
    return RsurProtocolsService;
}());
RsurProtocolsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient])
], RsurProtocolsService);
exports.RsurProtocolsService = RsurProtocolsService;
//# sourceMappingURL=rsur-protocols.service.js.map