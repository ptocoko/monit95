"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var particip_service_1 = require("../../services/particip.service");
var account_service_1 = require("../../services/account.service");
var particip_model_1 = require("../../models/particip.model");
var constants_1 = require("../../shared/constants");
var AddParticipComponent = /** @class */ (function () {
    function AddParticipComponent(participService, accountService, location) {
        this.participService = participService;
        this.accountService = accountService;
        this.location = location;
        this.particip = new particip_model_1.ParticipModel();
        this.actionText = 'Добавить';
    }
    AddParticipComponent.prototype.onSubmit = function () {
        var _this = this;
        this.particip.ProjectId = constants_1.Constant.PROJECT_ID;
        this.particip.SchoolId = this.accountService.account.UserName;
        this.particip.SourceName = "Школа";
        this.participService.addParticip(this.particip).subscribe(function (res) {
            _this.back();
        });
    };
    AddParticipComponent.prototype.back = function () {
        this.location.back();
    };
    AddParticipComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/particips/add-and-update/add.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [particip_service_1.ParticipService,
            account_service_1.AccountService,
            common_1.Location])
    ], AddParticipComponent);
    return AddParticipComponent;
}());
exports.AddParticipComponent = AddParticipComponent;
//# sourceMappingURL=add.component.js.map