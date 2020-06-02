"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var account_model_1 = require("../models/account.model");
var school_service_1 = require("../school.service");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var operators_1 = require("rxjs/operators");
var AccountService = /** @class */ (function () {
    function AccountService(http, schoolService) {
        this.http = http;
        this.schoolService = schoolService;
        this.account = new account_model_1.AccountModel();
        this.auth$ = new BehaviorSubject_1.BehaviorSubject(null);
        this.loadAccount();
    }
    Object.defineProperty(AccountService.prototype, "auth", {
        get: function () {
            return this.auth$.pipe(operators_1.filter(function (auth) { return auth !== null; }));
        },
        enumerable: true,
        configurable: true
    });
    AccountService.prototype.loadAccount = function () {
        var _this = this;
        this.http.get('api/account').subscribe(function (res) {
            _this.account = res;
            _this.auth$.next(res);
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
    AccountService.prototype.isCoko = function () {
        if (this.account.RoleNames) {
            return this.account.RoleNames.indexOf('coko') > -1;
        }
        return null;
    };
    AccountService.prototype.isITakeEGE = function () {
        if (this.account.RoleNames) {
            return this.account.RoleNames.indexOf('i-take-ege') > -1;
        }
        return null;
    };
    AccountService.prototype.isITakeOGE = function () {
        if (this.account.RoleNames) {
            return this.account.RoleNames.indexOf('i-take-oge') > -1;
        }
        return null;
    };
    AccountService.prototype.isGroznySchool = function () {
        if (this.account.RoleNames) {
            return this.account.RoleNames.indexOf('grozny-school') > -1;
        }
        return null;
    };
    AccountService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient, school_service_1.SchoolService])
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map