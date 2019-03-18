"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var account_service_1 = require("../../../services/account.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(account) {
        this.account = account;
        this.timeIsCome1 = false;
        this.timeIsCome2 = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var date = new Date();
        this.timeIsCome1 = (date.getDate() === 16 && date.getHours() >= 8) || date.getDate() > 16;
        this.timeIsCome2 = (date.getDate() === 16 && date.getHours() >= 14) || date.getDate() > 16;
    };
    HomeComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/9-11_classes/home/home.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [account_service_1.AccountService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map