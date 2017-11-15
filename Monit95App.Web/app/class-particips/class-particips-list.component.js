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
ClassParticipsListComponent = __decorate([
    core_1.Component({
        templateUrl: "./app/class-particips/class-particips-list.component.html?v=" + new Date().getTime()
    }),
    __metadata("design:paramtypes", [account_service_1.AccountService,
        particip_service_1.ParticipService, typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object])
], ClassParticipsListComponent);
exports.ClassParticipsListComponent = ClassParticipsListComponent;
var _a;
//# sourceMappingURL=class-particips-list.component.js.map