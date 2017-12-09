"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var account_service_1 = require("../../services/account.service");
var AppComponent = /** @class */ (function () {
    function AppComponent(accountService) {
        this.accountService = accountService;
        this.isAreaRole = false;
        this.isCokoRole = false;
        this.isRsur = true;
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.handler = function (userRoles) {
        this.isAreaRole = userRoles.indexOf('area') >= 0;
        this.isCokoRole = userRoles.indexOf('coko') >= 0;
    };
    AppComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: "./app/app.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [account_service_1.AccountService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map