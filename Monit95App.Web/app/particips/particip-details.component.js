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
var angular2_modal_1 = require("angular2-modal");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var particip_modal_component_1 = require("./particip-modal.component");
var particip_service_1 = require("./particip.service");
var user_service_1 = require("../user.service");
var ParticipDetailsComponent = (function () {
    function ParticipDetailsComponent(participService, userService, modal) {
        this.participService = participService;
        this.userService = userService;
        this.modal = modal;
    }
    ParticipDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getName().subscribe(function (response) {
            var result = response.json();
            _this.userName = result.UserName;
            _this.isAreaRole = result.IsAreaRole;
            _this.getByAreaCode();
        });
    };
    ParticipDetailsComponent.prototype.modalOpen = function (particip) {
        var _this = this;
        var modalWindow = this.modal.open(particip_modal_component_1.ParticipModalComponent, angular2_modal_1.overlayConfigFactory(particip, bootstrap_1.BSModalContext)).then(function (dialog) {
            dialog.result.then(function (res) {
                var bDay = res.birthday;
                var parCode = res.participCode;
                var classes = res.classes;
                _this.setBDayByParticipCode(parCode, bDay, classes);
            }).catch(function () {
                console.log('haha');
            });
        });
    };
    ParticipDetailsComponent.prototype.setBDayByParticipCode = function (participCode, bDay, participClasses) {
        this.particips.forEach(function (val, i, arr) {
            if (val.participCode === participCode) {
                val.birthday = bDay;
                val.classes = participClasses;
                return;
            }
        });
    };
    //Get by areaCode
    ParticipDetailsComponent.prototype.getByAreaCode = function () {
        var _this = this;
        this.participService.getByAreaCode(this.userName, this.isAreaRole).subscribe(function (particips) { return _this.particips = particips; });
    };
    return ParticipDetailsComponent;
}());
ParticipDetailsComponent = __decorate([
    core_1.Component({
        selector: 'particip-details',
        templateUrl: './app/particips/particip-details.html',
        providers: [particip_service_1.ParticipService, user_service_1.UserService, bootstrap_1.Modal]
    }),
    __metadata("design:paramtypes", [particip_service_1.ParticipService, user_service_1.UserService, bootstrap_1.Modal])
], ParticipDetailsComponent);
exports.ParticipDetailsComponent = ParticipDetailsComponent;
//# sourceMappingURL=particip-details.component.js.map