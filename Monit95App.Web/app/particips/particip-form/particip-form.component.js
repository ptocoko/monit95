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
var particip_service_1 = require("../particip.service");
var ParticipFormComponent = (function () {
    function ParticipFormComponent(dialog, participService) {
        this.dialog = dialog;
        this.participService = participService;
    }
    ParticipFormComponent.prototype.ngOnInit = function () {
        this.particip = this.dialog.context;
    };
    ParticipFormComponent.prototype.onSubmit = function () {
        console.log(this.particip);
        this.dialog.close();
    };
    ParticipFormComponent.prototype.cancel = function () {
        this.dialog.dismiss();
    };
    return ParticipFormComponent;
}());
ParticipFormComponent = __decorate([
    core_1.Component({
        selector: 'particip-form',
        templateUrl: './app/particips/particip-form/particip-form.component.html?v=${new Date().getTime()}'
    }),
    __metadata("design:paramtypes", [angular2_modal_1.DialogRef, particip_service_1.ParticipService])
], ParticipFormComponent);
exports.ParticipFormComponent = ParticipFormComponent;
//# sourceMappingURL=particip-form.component.js.map