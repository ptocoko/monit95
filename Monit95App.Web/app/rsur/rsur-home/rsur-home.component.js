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
var account_service_1 = require("../../account/account.service");
var account_1 = require("../../account/account");
var RsurHomeComponent = (function () {
    function RsurHomeComponent(accountService) {
        this.accountService = accountService;
        this.account = new account_1.Account();
    }
    RsurHomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accountService.getAccount().subscribe(function (data) {
            console.log(data);
            _this.account = data.json();
            console.log(_this.account);
            console.log(_this.account.RoleNames.indexOf('school') !== -1);
        });
    };
    RsurHomeComponent.prototype.isArea = function () {
        if (this.account.RoleNames != null)
            return this.account.RoleNames.indexOf('area') > -1;
        return null;
    };
    return RsurHomeComponent;
}());
RsurHomeComponent = __decorate([
    core_1.Component({
        templateUrl: "./app/rsur/rsur-home/rsur-home.component.html?v=" + new Date().getTime()
    }),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], RsurHomeComponent);
exports.RsurHomeComponent = RsurHomeComponent;
//# sourceMappingURL=rsur-home.component.js.map