"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var account_service_1 = require("../../services/account.service");
var rsur_test_service_1 = require("./rsur-test.service");
var account_model_1 = require("../../models/account.model");
var RsurTestStatistics = /** @class */ (function () {
    function RsurTestStatistics() {
    }
    return RsurTestStatistics;
}());
var RsurTestComponent = /** @class */ (function () {
    function RsurTestComponent(accountService, rsurTestService) {
        this.accountService = accountService;
        this.rsurTestService = rsurTestService;
        this.account = new account_model_1.AccountModel();
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
    RsurTestComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'test',
            templateUrl: "./app/rsur/rsur-test/rsur-test.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/rsur/rsur-test/rsur-test.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [account_service_1.AccountService,
            rsur_test_service_1.RsurTestService])
    ], RsurTestComponent);
    return RsurTestComponent;
}());
exports.RsurTestComponent = RsurTestComponent;
//# sourceMappingURL=rsur-test.component.js.map