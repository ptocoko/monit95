"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var account_service_1 = require("../services/account.service");
var particip_service_1 = require("../particip.service");
var PROJECT_ID = 1;
var ClassParticipsListComponent = (function () {
    function ClassParticipsListComponent(accountService, participService, router) {
        this.accountService = accountService;
        this.participService = participService;
        this.router = router;
        this.isLoading = true;
    }
    ClassParticipsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accountService.getAccount().subscribe(function (data) {
            _this.account = data.json();
            _this.participService.getAll(PROJECT_ID).subscribe(function (res) {
                _this.classParticips = res.json();
                _this.classParticips.forEach(function (val, i, arr) {
                    if (val.Birthday) {
                        val.Birthday = new Date(val.Birthday);
                    }
                });
                _this.isLoading = false;
            });
        });
    };
    ClassParticipsListComponent.prototype.addClassParticip = function () {
        this.router.navigate(['class-particips/new']);
    };
    ClassParticipsListComponent.prototype.updateClassParticip = function (classParticip) {
        this.router.navigate(['/class-particips/update', classParticip.Id]);
    };
    ClassParticipsListComponent.prototype.deleteClassParticip = function (particip) {
        var _this = this;
        var index = this.classParticips.indexOf(particip);
        var isDelete = confirm('Вы уверены что хотите удалить данную запись?');
        if (isDelete) {
            this.participService.deleteParticip(particip.Id).subscribe(function (res) {
                _this.classParticips.splice(index, 1);
            });
        }
    };
    return ClassParticipsListComponent;
}());
ClassParticipsListComponent = tslib_1.__decorate([
    core_1.Component({
        templateUrl: "./app/class-particips/class-particips-list.component.html?v=" + new Date().getTime()
    }),
    tslib_1.__metadata("design:paramtypes", [account_service_1.AccountService,
        particip_service_1.ParticipService,
        router_1.Router])
], ClassParticipsListComponent);
exports.ClassParticipsListComponent = ClassParticipsListComponent;
//# sourceMappingURL=class-particips-list.component.js.map