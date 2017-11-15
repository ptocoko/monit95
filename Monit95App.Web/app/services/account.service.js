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
var account_model_1 = require("../models/account.model");
var AccountService = (function () {
    function AccountService(http) {
        this.http = http;
        this.account = new account_model_1.AccountModel();
        this.loadAccount();
    }
    AccountService.prototype.loadAccount = function () {
        var _this = this;
        this.http.get('api/account').subscribe(function (res) {
            _this.account = res.json();
        });
    };
    AccountService.prototype.getAccount = function () {
        return this.http.get('api/account');
    };
    AccountService.prototype.isArea = function () {
        if (this.account.RoleNames != null)
            return this.account.RoleNames.indexOf('area') > -1;
        return null;
    };
    AccountService.prototype.isSchool = function () {
        if (this.account.RoleNames != null)
            return this.account.RoleNames.indexOf('school') > -1;
        return null;
    };
    AccountService.prototype.isRsurParticip = function () {
        if (this.account.RoleNames != null)
            return this.account.RoleNames.indexOf('rsur-particip') > -1;
        return null;
    };
    return AccountService;
}());
AccountService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], AccountService);
exports.AccountService = AccountService;
var _a;
//# sourceMappingURL=account.service.js.map