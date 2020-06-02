"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var account_service_1 = require("../../../services/account.service");
var account_model_1 = require("../../../models/account.model");
var rsur_protocols_service_1 = require("../../../services/rsur-protocols.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(accountService, rsurProtocolService) {
        this.accountService = accountService;
        this.rsurProtocolService = rsurProtocolService;
        this.account = new account_model_1.AccountModel();
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
    HomeComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/rsur/home/home.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/rsur/home/home.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [account_service_1.AccountService,
            rsur_protocols_service_1.RsurProtocolsService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map