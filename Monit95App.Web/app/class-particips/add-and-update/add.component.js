"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var particip_service_1 = require("../../particip.service");
var ClassParticip_1 = require("../ClassParticip");
var account_service_1 = require("../../account/account.service");
var router_1 = require("@angular/router");
exports.CLASS_NAMES = ['1', '1 А', '1 Б', '1 В', '1 Г', '1 Д', '1 Е', '1 Ж', '1 З', '1 И', '1 К', '1 Л'];
var PROJECT_ID = 1;
var AddClassParticipComponent = (function () {
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
    return AddClassParticipComponent;
}());
AddClassParticipComponent = __decorate([
    core_1.Component({
        templateUrl: "./app/class-particips/add-and-update/add.component.html?v=" + new Date().getTime()
    }),
    __metadata("design:paramtypes", [particip_service_1.ParticipService,
        account_service_1.AccountService,
        router_1.Router])
], AddClassParticipComponent);
exports.AddClassParticipComponent = AddClassParticipComponent;
//# sourceMappingURL=add.component.js.map