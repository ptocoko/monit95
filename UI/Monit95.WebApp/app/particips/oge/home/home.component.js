"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var account_service_1 = require("../../../services/account.service");
var OgeHomeComponent = /** @class */ (function () {
    function OgeHomeComponent(account) {
        this.account = account;
        this.timeIsCome = false;
    }
    OgeHomeComponent.prototype.ngOnInit = function () {
        var date = new Date();
        this.timeIsCome = (date.getDate() === 18 && date.getHours() >= 14) || date.getDate() > 18;
    };
    OgeHomeComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/particips/oge/home/home.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [account_service_1.AccountService])
    ], OgeHomeComponent);
    return OgeHomeComponent;
}());
exports.OgeHomeComponent = OgeHomeComponent;
//# sourceMappingURL=home.component.js.map