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
var rsurparticip_service_1 = require("../rsurparticip.service");
var AddModalFormComponent = (function () {
    function AddModalFormComponent(dialog, participService) {
        this.dialog = dialog;
        this.participService = participService;
    }
    AddModalFormComponent.prototype.ngOnInit = function () {
        this.particip = this.dialog.context;
    };
    AddModalFormComponent.prototype.onSubmit = function () {
        console.log(this.particip);
        this.dialog.close(this.particip);
    };
    AddModalFormComponent.prototype.cancel = function () {
        this.dialog.dismiss();
    };
    return AddModalFormComponent;
}());
AddModalFormComponent = __decorate([
    core_1.Component({
        selector: 'add-modal-form',
        templateUrl: './app/rsur/add-modal-form/add-modal-form.html?v=${new Date().getTime()}'
    }),
    __metadata("design:paramtypes", [angular2_modal_1.DialogRef,
        rsurparticip_service_1.RsurParticipService])
], AddModalFormComponent);
exports.AddModalFormComponent = AddModalFormComponent;
//# sourceMappingURL=add-modal-form.component.js.map