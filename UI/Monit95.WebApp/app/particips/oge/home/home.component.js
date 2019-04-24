"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var account_service_1 = require("../../../services/account.service");
var OgeHomeComponent = /** @class */ (function () {
    function OgeHomeComponent(account) {
        this.account = account;
        this.date = new Date();
    }
    OgeHomeComponent.prototype.ngOnInit = function () {
    };
    OgeHomeComponent.prototype.setTimer = function (day, hours) {
        if (hours === void 0) { hours = 8; }
        return (this.date.getDate() === day && this.date.getHours() >= hours) || this.date.getDate() > day;
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