"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var particip_service_1 = require("../../particip.service");
var ClassParticip_1 = require("../ClassParticip");
var account_service_1 = require("../../services/account.service");
exports.CLASS_NAMES = ['1', '1 А', '1 Б', '1 В', '1 Г', '1 Д', '1 Е', '1 Ж', '1 З', '1 И', '1 К', '1 Л'];
var PROJECT_ID = 1;
var AddClassParticipComponent = /** @class */ (function () {
    function AddClassParticipComponent(participService, accountService, router) {
        this.participService = participService;
        this.accountService = accountService;
        this.router = router;
        this.particip = new ClassParticip_1.ClassParticip();
        this.classNames = exports.CLASS_NAMES;
        this.wasDoo = 'no';
        this.actionText = 'Добавить';
    }
    AddClassParticipComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accountService.getAccount().subscribe(function (res) {
            _this.particip.SchoolId = res.json().UserName;
            _this.particip.ProjectId = PROJECT_ID;
        });
    };
    AddClassParticipComponent.prototype.onSubmit = function () {
        var _this = this;
        this.particip.WasDoo = this.wasDoo === 'yes';
        if (this.newMonth === -1) {
            alert("Выберите месяц рождения!");
            return;
        }
        var birthdayInMiSeconds = new Date().setUTCFullYear(this.newYear, this.newMonth, this.newDay);
        this.particip.Birthday = new Date(birthdayInMiSeconds + 10800000);
        this.participService.addParticip(this.particip).subscribe(function (res) {
            _this.router.navigate(['class-particips/list']);
        });
    };
    AddClassParticipComponent.prototype.cancel = function () {
        this.router.navigate(['class-particips/list']);
    };
    AddClassParticipComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/class-particips/add-and-update/add.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [particip_service_1.ParticipService,
            account_service_1.AccountService,
            router_1.Router])
    ], AddClassParticipComponent);
    return AddClassParticipComponent;
}());
exports.AddClassParticipComponent = AddClassParticipComponent;
//# sourceMappingURL=add.component.js.map