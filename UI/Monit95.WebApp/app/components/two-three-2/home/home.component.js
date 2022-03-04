"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var account_service_1 = require("../../../services/account.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(accountService) {
        this.accountService = accountService;
        // timeIsCome = false;
        this.date = new Date();
    }
    HomeComponent.prototype.ngOnInit = function () {
        //
        //this.timeIsCome = (date.getDate() === 8 && date.getHours() >= 7 && date.getMinutes() >= 30) || date.getDate() > 8;
    };
    HomeComponent.prototype.timeIsCome = function (day, hours, minutes) {
        return (this.date.getDate() === day && (this.date.getHours() === hours && this.date.getMinutes() >= minutes) || this.date.getHours() > hours) || this.date.getDate() > day;
    };
    HomeComponent = tslib_1.__decorate([
        (0, core_1.Component)({
            templateUrl: "./app/components/two-three-2/home/home.component.html?v=".concat(new Date().getTime()),
            styleUrls: ["./app/components/two-three-2/home/home.component.css?v=".concat(new Date().getTime())]
        }),
        tslib_1.__metadata("design:paramtypes", [account_service_1.AccountService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map