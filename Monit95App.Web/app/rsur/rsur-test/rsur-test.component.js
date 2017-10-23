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
var rsur_test_service_1 = require("./rsur-test.service");
var account_1 = require("../../account/account");
var RsurTestStatistics = (function () {
    function RsurTestStatistics() {
    }
    return RsurTestStatistics;
}());
var RsurTestComponent = (function () {
    function RsurTestComponent(accountService, rsurTestService) {
        this.accountService = accountService;
        this.rsurTestService = rsurTestService;
        this.account = new account_1.Account();
        this.componentIsShowing = false;
    }
    RsurTestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accountService.getAccount().subscribe(function (data) {
            _this.account = data.json();
            _this.rsurTestService.getProtocolStatus().subscribe(function (res) {
                _this.protocolValues = res.json();
                _this.componentIsShowing = true;
            });
        });
        //this.getProtocolStatus(1082);
    };
    RsurTestComponent.prototype.isArea206 = function () {
        if (this.account.RoleNames != null)
            return this.account.UserName === '206';
        return null;
    };
    RsurTestComponent.prototype.getProgressValue = function (rsurTestId) {
        if (this.componentIsShowing) {
            return this.protocolValues[rsurTestId].ProtocolStatus;
        }
        else {
            return 0;
        }
    };
    RsurTestComponent.prototype.hasValues = function (rsurTestId) {
        if (this.componentIsShowing) {
            return this.protocolValues[rsurTestId].HasAnyParticip;
        }
        else {
            return true;
        }
    };
    return RsurTestComponent;
}());
RsurTestComponent = __decorate([
    core_1.Component({
        selector: 'test',
        templateUrl: "./app/rsur/rsur-test/rsur-test.component.html?v=" + new Date().getTime(),
        styleUrls: ["./app/rsur/rsur-test/rsur-test.component.css?v=" + new Date().getTime()]
    }),
    __metadata("design:paramtypes", [account_service_1.AccountService,
        rsur_test_service_1.RsurTestService])
], RsurTestComponent);
exports.RsurTestComponent = RsurTestComponent;
//# sourceMappingURL=rsur-test.component.js.map