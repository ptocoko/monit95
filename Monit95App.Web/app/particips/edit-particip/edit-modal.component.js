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
var EditModalComponent = (function () {
    function EditModalComponent(dialog) {
        this.dialog = dialog;
        this.particip = dialog.context;
    }
    EditModalComponent.prototype.onSubmit = function () {
        console.log(JSON.stringify(this.particip));
        this.dialog.close();
    };
    return EditModalComponent;
}());
EditModalComponent = __decorate([
    core_1.Component({
        selector: 'edit-modal',
        templateUrl: './app/particips/edit-particip/edit-modal.html',
        styleUrls: ['./app/particips/edit-particip/edit-modal.css']
    }),
    __metadata("design:paramtypes", [angular2_modal_1.DialogRef])
], EditModalComponent);
exports.EditModalComponent = EditModalComponent;
//# sourceMappingURL=edit-modal.component.js.map