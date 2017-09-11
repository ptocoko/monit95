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
var EditModalComponent = (function () {
    function EditModalComponent(dialog, participService) {
        this.dialog = dialog;
        this.participService = participService;
        this.particip = dialog.context;
        //this.editParticip = new ParticipEditModel(this.particip.Code, this.particip.Surname, this.particip.Name, this.particip.SecondName);
    }
    //onSubmit() {
    //	this.participService.postRequestToEdit(this.editParticip).subscribe(res => {
    //		this.dialog.close(this.particip);
    //	});
    //}
    EditModalComponent.prototype.cancel = function () {
        this.dialog.dismiss();
    };
    return EditModalComponent;
}());
EditModalComponent = __decorate([
    core_1.Component({
        selector: 'edit-modal',
        templateUrl: './app/rsur/edit-particip/edit-modal.html',
        styleUrls: ['./app/rsur/edit-particip/edit-modal.css']
    }),
    __metadata("design:paramtypes", [angular2_modal_1.DialogRef, rsurparticip_service_1.RsurParticipService])
], EditModalComponent);
exports.EditModalComponent = EditModalComponent;
//# sourceMappingURL=edit-modal.component.js.map