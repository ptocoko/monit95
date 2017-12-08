"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var account_service_1 = require("../services/account.service");
var ResultComponent = (function () {
    function ResultComponent(accountService) {
        this.accountService = accountService;
    }
    ResultComponent.prototype.ngOnInit = function () {
        //this.userService.getName().subscribe(user => {
        //	if (user.userRoles.indexOf('area') >= 0)
        //		this.areaCode = Number.parseInt(user.userName);
    };
    return ResultComponent;
}());
ResultComponent = tslib_1.__decorate([
    core_1.Component({
        selector: 'result',
        templateUrl: './app/result/result.html',
        providers: [account_service_1.AccountService]
    }),
    tslib_1.__metadata("design:paramtypes", [account_service_1.AccountService])
], ResultComponent);
exports.ResultComponent = ResultComponent;
//# sourceMappingURL=result.component.js.map