"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var account_service_1 = require("../../../services/account.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(accountService) {
        this.accountService = accountService;
        this.timeIsCome = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var date = new Date();
        this.timeIsCome = (date.getDate() === 3 && date.getHours() >= 8) || date.getDate() > 3;
    };
    HomeComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/components/two-three-2/home/home.component.html?v=" + new Date().getTime(),
            styleUrls: ["./app/components/two-three-2/home/home.component.css?v=" + new Date().getTime()]
        }),
        tslib_1.__metadata("design:paramtypes", [account_service_1.AccountService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map