"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var account_service_1 = require("../../services/account.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(accountService) {
        this.accountService = accountService;
        this.timeIsCome = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var date = new Date();
        this.timeIsCome = (date.getDate() === 1 && date.getHours() >= 7 && date.getMonth() === 5) || (date.getDate() > 1 && date.getMonth() === 5);
    };
    HomeComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            templateUrl: "./app/one-two-three/home/home.component.html?v=".concat(new Date().getTime())
        }),
        tslib_1.__metadata("design:paramtypes", [account_service_1.AccountService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map