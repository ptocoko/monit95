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
import { AccountModel } from '../models/account.model';
import { SchoolService } from '../school.service';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
var AccountService = /** @class */ (function () {
    function AccountService(http, schoolService) {
        this.http = http;
        this.schoolService = schoolService;
        this.account = new AccountModel();
        this.auth$ = new BehaviorSubject(null);
        this.loadAccount();
    }
    Object.defineProperty(AccountService.prototype, "auth", {
        get: function () {
            return this.auth$.pipe(filter(function (auth) { return auth !== null; }));
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
    AccountService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, SchoolService])
    ], AccountService);
    return AccountService;
}());
export { AccountService };
//# sourceMappingURL=account.service.js.map