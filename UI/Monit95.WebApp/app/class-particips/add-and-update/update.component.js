"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var ClassParticip_1 = require("../ClassParticip");
var particip_service_1 = require("../../particip.service");
var account_service_1 = require("../../services/account.service");
var CLASS_NAMES = ['1', '1 А', '1 Б', '1 В', '1 Г', '1 Д', '1 Е', '1 Ж', '1 З', '1 И', '1 К', '1 Л'];
var PROJECT_ID = 1;
var UpdateClassParticipComponent = /** @class */ (function () {
    function UpdateClassParticipComponent(participService, accountService, router, route) {
        this.participService = participService;
        this.accountService = accountService;
        this.router = router;
        this.route = route;
        this.particip = new ClassParticip_1.ClassParticip();
        this.classNames = CLASS_NAMES;
        this.wasDoo = 'no';
        this.actionText = 'Изменить';
    }
    UpdateClassParticipComponent.prototype.ngOnInit = function () {
        var _this = this;
        var participId = this.route.snapshot.paramMap.get('id');
        this.participService.getParticip(+participId).subscribe(function (res) {
            _this.particip = res.json();
            _this.particip.ClassName = _this.particip.ClassName.trim();
            _this.particip.Birthday = new Date(_this.particip.Birthday);
            if (_this.particip.Birthday) {
                _this.newDay = _this.particip.Birthday.getDate();
                _this.newMonth = _this.particip.Birthday.getMonth();
                _this.newYear = _this.particip.Birthday.getFullYear();
            }
            if (_this.particip.WasDoo) {
                _this.wasDoo = 'yes';
            }
        });
    };
    UpdateClassParticipComponent.prototype.onSubmit = function () {
        var _this = this;
        this.particip.WasDoo = this.wasDoo === 'yes';
        if (this.newMonth === -1) {
            alert('Выберите месяц рождения!');
            return;
        }
        var birthdayInMiSeconds = new Date().setUTCFullYear(this.newYear, this.newMonth, this.newDay);
        this.particip.Birthday = new Date(birthdayInMiSeconds + 10800000);
        this.participService.updateParticip(this.particip).subscribe(function (res) {
            _this.router.navigate(['class-particips/list']);
        });
    };
    UpdateClassParticipComponent.prototype.cancel = function () {
        this.router.navigate(['class-particips/list']);
    };
    UpdateClassParticipComponent = tslib_1.__decorate([
        core_1.Component({
            templateUrl: "./app/class-particips/add-and-update/update.component.html?v=" + new Date().getTime()
        }),
        tslib_1.__metadata("design:paramtypes", [particip_service_1.ParticipService,
            account_service_1.AccountService,
            router_1.Router,
            router_1.ActivatedRoute])
    ], UpdateClassParticipComponent);
    return UpdateClassParticipComponent;
}());
exports.UpdateClassParticipComponent = UpdateClassParticipComponent;
//# sourceMappingURL=update.component.js.map