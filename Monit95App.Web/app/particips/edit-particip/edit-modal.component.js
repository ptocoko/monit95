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
var edit_particip_model_1 = require("./edit-particip.model");
var particip_service_1 = require("../particip.service");
var EditModalComponent = (function () {
    function EditModalComponent(dialog, participService) {
        this.dialog = dialog;
        this.participService = participService;
        this.particip = dialog.context;
        this.editParticip = new edit_particip_model_1.ParticipEditModel(this.particip.participCode, this.particip.surname, this.particip.name, this.particip.secondName);
    }
    EditModalComponent.prototype.onSubmit = function () {
        var _this = this;
        this.participService.postRequestToEdit(this.editParticip).subscribe(function (res) {
            _this.particip.hasRequestToEdit = true;
            _this.dialog.close(_this.particip);
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    EditModalComponent.prototype.cancel = function () {
        this.dialog.dismiss();
    };
    return EditModalComponent;
}());
EditModalComponent = __decorate([
    core_1.Component({
        selector: 'edit-modal',
        templateUrl: './app/particips/edit-particip/edit-modal.html',
        styleUrls: ['./app/particips/edit-particip/edit-modal.css']
    }),
    __metadata("design:paramtypes", [angular2_modal_1.DialogRef, particip_service_1.ParticipService])
], EditModalComponent);
exports.EditModalComponent = EditModalComponent;
//# sourceMappingURL=edit-modal.component.js.map