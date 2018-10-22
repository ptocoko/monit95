"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var account_service_1 = require("../../services/account.service");
var file_service_1 = require("../../services/file.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(account, file) {
        this.account = account;
        this.file = file;
        this.timeIsCome = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        //const date = new Date();
        //this.timeIsCome = (date.getDate() === 8 && date.getHours() >= 14) || date.getDate() > 8;
    };
    HomeComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/particips/home/home.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [account_service_1.AccountService, file_service_1.FileService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map