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
var account_service_1 = require("../account/account.service");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var angular2_modal_1 = require("angular2-modal");
var add_class_particip_modal_1 = require("./add-class-particip.modal");
var particip_service_1 = require("../particip.service");
var http_1 = require("@angular/http");
var PROJECT_ID = 1;
var ClassParticipsListComponent = (function () {
    function ClassParticipsListComponent(accountService, participService, modal, http) {
        this.accountService = accountService;
        this.participService = participService;
        this.modal = modal;
        this.http = http;
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
        var _this = this;
        this.modal.open(add_class_particip_modal_1.AddClassParticipModal, angular2_modal_1.overlayConfigFactory({ isUpdate: false, schoolId: this.account.UserName, projectId: PROJECT_ID }, bootstrap_1.BSModalContext)).then(function (dialog) {
            dialog.result.then(function (classParticip) {
                if (classParticip) {
                    _this.classParticips.push(classParticip);
                }
            }).catch(function () { });
        });
    };
    ClassParticipsListComponent.prototype.updateClassParticip = function (classParticip) {
        var _this = this;
        var index = this.classParticips.indexOf(classParticip);
        this.modal.open(add_class_particip_modal_1.AddClassParticipModal, angular2_modal_1.overlayConfigFactory({
            isUpdate: true,
            particip: Object.assign({}, classParticip)
        }, bootstrap_1.BSModalContext))
            .then(function (dialog) {
            dialog.result.then(function (changedParticip) {
                if (changedParticip) {
                    _this.classParticips[index] = changedParticip;
                }
            }).catch(function () { });
        });
    };
    ClassParticipsListComponent.prototype.deleteClassParticip = function (particip) {
        var _this = this;
        var index = this.classParticips.indexOf(particip);
        this.modal.confirm()
            .title("Вы уверены, что хотите удалить данную запись?")
            .body("Это действие нельзя будет отменить")
            .open()
            .then(function (dialog) {
            dialog.result.then(function (res) {
                _this.participService.deleteParticip(particip.Id).subscribe(function (res) {
                    _this.classParticips.splice(index, 1);
                });
            }).catch(function () {
            });
        });
    };
    return ClassParticipsListComponent;
}());
ClassParticipsListComponent = __decorate([
    core_1.Component({
        templateUrl: './app/class-particips/class-particips-list.component.html',
        providers: [bootstrap_1.Modal]
    }),
    __metadata("design:paramtypes", [account_service_1.AccountService,
        particip_service_1.ParticipService,
        bootstrap_1.Modal,
        http_1.Http])
], ClassParticipsListComponent);
exports.ClassParticipsListComponent = ClassParticipsListComponent;
//# sourceMappingURL=class-particips-list.component.js.map