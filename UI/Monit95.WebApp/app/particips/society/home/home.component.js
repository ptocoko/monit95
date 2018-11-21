"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var account_service_1 = require("../../../services/account.service");
var SocietyHomeComponent = /** @class */ (function () {
    function SocietyHomeComponent(account) {
        this.account = account;
        this.timeIsCome = false;
    }
    SocietyHomeComponent.prototype.ngOnInit = function () {
        var date = new Date();
        this.timeIsCome = this.account.account.UserName === '0000' ? true : (date.getDate() === 21 && date.getHours() >= 8) || date.getDate() > 21;
    };
    SocietyHomeComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/particips/society/home/home.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [account_service_1.AccountService])
    ], SocietyHomeComponent);
    return SocietyHomeComponent;
}());
exports.SocietyHomeComponent = SocietyHomeComponent;
//# sourceMappingURL=home.component.js.map