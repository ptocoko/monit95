"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var account_service_1 = require("../services/account.service");
var PlanComponent = /** @class */ (function () {
    function PlanComponent(accountService) {
        this.accountService = accountService;
    }
    PlanComponent.prototype.ngOnInit = function () {
    };
    PlanComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'plan',
            templateUrl: './app/plan/plan.html',
            providers: [account_service_1.AccountService]
        }),
        tslib_1.__metadata("design:paramtypes", [account_service_1.AccountService])
    ], PlanComponent);
    return PlanComponent;
}());
exports.PlanComponent = PlanComponent;
;
//# sourceMappingURL=plan.component.js.map