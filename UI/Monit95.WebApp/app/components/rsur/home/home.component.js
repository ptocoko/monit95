var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { AccountModel } from '../../../models/account.model';
import { RsurProtocolsService } from '../../../services/rsur-protocols.service';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(accountService, rsurProtocolService) {
        this.accountService = accountService;
        this.rsurProtocolService = rsurProtocolService;
        this.account = new AccountModel();
        this.isLoading = true;
        this.date = new Date();
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accountService.getAccount().subscribe(function (data) {
            _this.account = data;
            _this.isLoading = false;
            localStorage.clear();
            _this.getStatistics();
        });
    };
    HomeComponent.prototype.setTimer = function (day, hours) {
        if (hours === void 0) { hours = 12; }
        return (this.date.getDate() === day && this.date.getHours() >= hours) || this.date.getDate() > day;
    };
    HomeComponent.prototype.getStatistics = function () {
        var _this = this;
        this.rsurProtocolService.getStatistics().subscribe(function (progress) { return _this._fillingProgress = progress; }, function (error) {
            var modelState = JSON.parse(error.error).ModelState;
            if (!modelState['404']) {
                throw error;
            }
        });
    };
    HomeComponent.prototype.isArea = function () {
        if (this.account.RoleNames != null)
            return this.account.RoleNames.indexOf('area') > -1 && this.account.UserName !== '200';
        return null;
    };
    HomeComponent.prototype.isSchool = function () {
        if (this.account.RoleNames != null)
            return this.account.RoleNames.indexOf('school') > -1;
        return null;
    };
    HomeComponent.prototype.isRsurParticip = function () {
        if (this.account.RoleNames != null) {
            return this.account.RoleNames.indexOf('rsur-particip') > -1;
        }
        return null;
    };
    HomeComponent.prototype.isArgun = function () {
        return this.account.UserName && this.account.UserName === '202';
    };
    HomeComponent.prototype.isAdmin = function () {
        return this.account.UserName && this.account.UserName === '200';
    };
    HomeComponent.prototype.fillingProgress = function () {
        if (!this._fillingProgress) {
            return 0;
        }
        return Number.parseInt(this._fillingProgress);
    };
    HomeComponent = __decorate([
        Component({
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        }),
        __metadata("design:paramtypes", [AccountService,
            RsurProtocolsService])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map