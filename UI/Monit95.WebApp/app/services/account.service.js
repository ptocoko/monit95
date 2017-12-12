"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var account_model_1 = require("../models/account.model");
var AccountService = /** @class */ (function () {
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
    AccountService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.Http])
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map