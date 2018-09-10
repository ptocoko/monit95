"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var account_service_1 = require("../../../services/account.service");
var local_storage_1 = require("../../../utils/local-storage");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(accountService) {
        this.accountService = accountService;
        this.timeIsCome = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        //const date = new Date();
        //this.timeIsCome = (date.getDate() === 17 && date.getHours() >= 8) || date.getDate() > 17;
        local_storage_1.removeFromLocalStorage('FIRST_CLASS_ID');
    };
    HomeComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/first-class/home/home.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [account_service_1.AccountService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map